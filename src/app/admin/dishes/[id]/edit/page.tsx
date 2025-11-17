import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { addDishSchema } from '@/lib/validations';
import { redirect, notFound } from 'next/navigation';
import DishForm from '@/components/DishForm';

type FormState = {
  errors?: {
    name?: string[];
    seasonIds?: string[];
    _form?: string[];
  };
  success?: boolean;
};

async function getDish(id: number) {
  const dish = await prisma.dish.findUnique({
    where: { id },
    include: {
      seasons: true,
    },
  });

  return dish;
}

async function getSeasons() {
  return await prisma.season.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export default async function EditDishPage({
  params,
}: {
  params: { id: string };
}) {
  const dishId = parseInt(params.id);

  if (isNaN(dishId)) {
    notFound();
  }

  const [dish, seasons] = await Promise.all([getDish(dishId), getSeasons()]);

  if (!dish) {
    notFound();
  }

  const updateDish = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    'use server';

    try {
      const seasonValues = formData.getAll('season');
      const seasonIds = seasonValues.map((season) => parseInt(season as string));

      // Validate input with Zod
      const validatedData = addDishSchema.parse({
        name: formData.get('name'),
        seasonIds,
      });

      await prisma.dish.update({
        where: {
          id: dishId,
        },
        data: {
          name: validatedData.name,
          seasons: {
            set: validatedData.seasonIds.map((id) => ({ id })),
          },
        },
      });

      revalidatePath('/admin/dishes');
      revalidatePath(`/admin/dishes/${dishId}/edit`);
      redirect('/admin/dishes');
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
            'Une erreur est survenue lors de la modification du plat. Veuillez réessayer.',
          ],
        },
      };
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Modifier le plat
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Modifiez les informations du plat &quot;{dish.name}&quot;
        </p>
      </div>

      <div className="max-w-2xl">
        <DishForm
          action={updateDish}
          seasons={seasons}
          defaultValues={{
            name: dish.name,
            seasonIds: dish.seasons.map((s) => s.id),
          }}
          submitLabel="Enregistrer les modifications"
        />
      </div>
    </div>
  );
}
