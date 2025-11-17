import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { addDishSchema } from '@/lib/validations';
import { redirect } from 'next/navigation';
import DishForm from '@/components/DishForm';

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

export default async function AddDishPage() {
  const seasons = await getSeasons();

  const addDish = async (
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

      await prisma.dish.create({
        data: {
          name: validatedData.name,
          seasons: {
            connect: validatedData.seasonIds.map((id) => ({ id })),
          },
        },
      });

      revalidatePath('/admin/dishes');
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
            "Une erreur est survenue lors de l'ajout du plat. Veuillez réessayer.",
          ],
        },
      };
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Ajouter un plat
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Créez un nouveau plat avec ses saisons
        </p>
      </div>

      <div className="max-w-2xl">
        <DishForm action={addDish} seasons={seasons} submitLabel="Créer le plat" />
      </div>
    </div>
  );
}
