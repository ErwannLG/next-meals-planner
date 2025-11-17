import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { DeleteVegetableButton } from '@/components/DeleteVegetableButton';

async function getVegetables() {
  return await prisma.vegetable.findMany({
    include: {
      seasons: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export default async function VegetablesPage() {
  const vegetables = await getVegetables();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gestion des légumes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {vegetables.length} légume{vegetables.length > 1 ? 's' : ''}{' '}
            enregistré
            {vegetables.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/admin/vegetables/add">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus size={20} className="mr-2" />
            Ajouter un légume
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
              {vegetables.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="p-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    Aucun légume enregistré. Commencez par en ajouter un !
                  </td>
                </tr>
              ) : (
                vegetables.map((vegetable) => (
                  <tr
                    key={vegetable.id}
                    className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-4 text-gray-900 dark:text-white">
                      {vegetable.name}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        {vegetable.seasons.map((season) => (
                          <span
                            key={season.id}
                            className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          >
                            {season.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/vegetables/${vegetable.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil size={16} className="mr-1" />
                            Éditer
                          </Button>
                        </Link>
                        <DeleteVegetableButton
                          vegetableId={vegetable.id}
                          vegetableName={vegetable.name}
                        />
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
