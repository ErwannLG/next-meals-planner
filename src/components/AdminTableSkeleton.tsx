import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function AdminTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-10 w-44" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4">
                  <Skeleton className="h-6 w-16" />
                </th>
                <th className="text-left p-4">
                  <Skeleton className="h-6 w-20" />
                </th>
                <th className="text-right p-4">
                  <Skeleton className="h-6 w-20 ml-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="p-4">
                    <Skeleton className="h-6 w-48" />
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-28" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
