import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { addVegetableSchema } from '@/lib/validations';
import { redirect } from 'next/navigation';
import VegetableForm from '@/components/VegetableForm';

type FormState = {
  errors?: {
    name?: string[];
    seasonIds?: string[];
    _form?: string[];
  };
  success?: boolean;
};

async function getSeasons() {
  return await prisma.season.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export default async function AddVegetablePage() {
  const seasons = await getSeasons();

  const addVegetable = async (
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

      await prisma.vegetable.create({
        data: {
          name: validatedData.name,
          seasons: {
            connect: validatedData.seasonIds.map((id) => ({ id })),
          },
        },
      });

      revalidatePath('/admin/vegetables');
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
            "Une erreur est survenue lors de l'ajout du légume. Veuillez réessayer.",
          ],
        },
      };
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Ajouter un légume
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Créez un nouveau légume avec ses saisons
        </p>
      </div>

      <div className="max-w-2xl">
        <VegetableForm
          action={addVegetable}
          seasons={seasons}
          submitLabel="Créer le légume"
        />
      </div>
    </div>
  );
}
