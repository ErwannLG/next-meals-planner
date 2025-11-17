import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { addVegetableSchema } from '@/lib/validations';
import { redirect, notFound } from 'next/navigation';
import VegetableForm from '@/components/VegetableForm';

type FormState = {
  errors?: {
    name?: string[];
    seasonIds?: string[];
    _form?: string[];
  };
  success?: boolean;
};

async function getVegetable(id: number) {
  const vegetable = await prisma.vegetable.findUnique({
    where: { id },
    include: {
      seasons: true,
    },
  });

  return vegetable;
}

async function getSeasons() {
  return await prisma.season.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export default async function EditVegetablePage({
  params,
}: {
  params: { id: string };
}) {
  const vegetableId = parseInt(params.id);

  if (isNaN(vegetableId)) {
    notFound();
  }

  const [vegetable, seasons] = await Promise.all([
    getVegetable(vegetableId),
    getSeasons(),
  ]);

  if (!vegetable) {
    notFound();
  }

  const updateVegetable = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    'use server';

    try {
      const seasonValues = formData.getAll('season');
      const seasonIds = seasonValues.map((season) => parseInt(season as string));

      // Validate input with Zod
      const validatedData = addVegetableSchema.parse({
        name: formData.get('name'),
        seasonIds,
      });

      await prisma.vegetable.update({
        where: {
          id: vegetableId,
        },
        data: {
          name: validatedData.name,
          seasons: {
            set: validatedData.seasonIds.map((id) => ({ id })),
          },
        },
      });

      revalidatePath('/admin/vegetables');
      revalidatePath(`/admin/vegetables/${vegetableId}/edit`);
      redirect('/admin/vegetables');
    } catch (error: unknown) {
      // Handle Zod validation errors
      if (error && typeof error === 'object' && 'issues' in error) {
        const zodError = error as {
          issues: Array<{ path: (string | number)[]; message: string }>;
        };
        const errors: {
          name?: string[];
          seasonIds?: string[];
          _form?: string[];
        } = {};

        zodError.issues.forEach((issue) => {
          const field = issue.path[0];
          if (field === 'name' || field === 'seasonIds' || field === '_form') {
            if (!errors[field]) {
              errors[field] = [];
            }
            errors[field]!.push(issue.message);
          }
        });

        return { errors };
      }

      // Handle other errors
      return {
        errors: {
          _form: [
            'Une erreur est survenue lors de la modification du légume. Veuillez réessayer.',
          ],
        },
      };
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Modifier le légume
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Modifiez les informations du légume &quot;{vegetable.name}&quot;
        </p>
      </div>

      <div className="max-w-2xl">
        <VegetableForm
          action={updateVegetable}
          seasons={seasons}
          defaultValues={{
            name: vegetable.name,
            seasonIds: vegetable.seasons.map((s) => s.id),
          }}
          submitLabel="Enregistrer les modifications"
        />
      </div>
    </div>
  );
}
