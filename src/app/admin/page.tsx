import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UtensilsCrossed, Carrot, Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';

async function getStats() {
  const [dishesCount, vegetablesCount] = await Promise.all([
    prisma.dish.count(),
    prisma.vegetable.count(),
  ]);

  return {
    dishes: dishesCount,
    vegetables: vegetablesCount,
  };
}

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Admin
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez vos plats et légumes
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Plats
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.dishes}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UtensilsCrossed className="text-blue-600 dark:text-blue-300" size={24} />
            </div>
          </div>
          <Link href="/admin/dishes" className="mt-4 block">
            <Button variant="outline" className="w-full">
              Voir tous les plats
            </Button>
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Légumes
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.vegetables}
              </h3>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Carrot className="text-green-600 dark:text-green-300" size={24} />
            </div>
          </div>
          <Link href="/admin/vegetables" className="mt-4 block">
            <Button variant="outline" className="w-full">
              Voir tous les légumes
            </Button>
          </Link>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Actions rapides
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/admin/dishes/add">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Plus className="text-blue-600 dark:text-blue-300" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Ajouter un plat
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Créer un nouveau plat
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/vegetables/add">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Plus className="text-green-600 dark:text-green-300" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Ajouter un légume
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Créer un nouveau légume
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
