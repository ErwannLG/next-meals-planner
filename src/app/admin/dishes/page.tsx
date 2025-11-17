import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { DeleteDishButton } from '@/components/DeleteDishButton';

async function getDishes() {
  return await prisma.dish.findMany({
    include: {
      seasons: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export default async function DishesPage() {
  const dishes = await getDishes();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gestion des plats
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {dishes.length} plat{dishes.length > 1 ? 's' : ''} enregistré
            {dishes.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/admin/dishes/add">
          <Button>
            <Plus size={20} className="mr-2" />
            Ajouter un plat
          </Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">
                  Nom
                </th>
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">
                  Saisons
                </th>
                <th className="text-right p-4 font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dishes.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500 dark:text-gray-400">
                    Aucun plat enregistré. Commencez par en ajouter un !
                  </td>
                </tr>
              ) : (
                dishes.map((dish) => (
                  <tr
                    key={dish.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-4 text-gray-900 dark:text-white">
                      {dish.name}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        {dish.seasons.map((season) => (
                          <span
                            key={season.id}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          >
                            {season.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/dishes/${dish.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil size={16} className="mr-1" />
                            Éditer
                          </Button>
                        </Link>
                        <DeleteDishButton dishId={dish.id} dishName={dish.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
