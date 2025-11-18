import { Skeleton } from '@/components/ui/skeleton';

export function MealCardSkeleton() {
  return (
    <article className="shrink-0 grow-0 basis-auto rounded-lg border px-4 py-4 shadow-lg md:w-80 lg:w-64">
      {/* Day heading */}
      <Skeleton className="h-7 w-24 mx-auto mb-2" />

      <div className="space-y-4 pt-2">
        {/* Dish item */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-12" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>

        {/* Vegetable item */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function WeeklyMealsSkeleton({ days = 5 }: { days?: number }) {
  return (
    <>
      <section
        className="my-auto flex flex-col justify-center gap-6 py-4 md:flex-row md:flex-wrap lg:gap-4"
        aria-label="Chargement des repas de la semaine"
      >
        {Array.from({ length: days }).map((_, index) => (
          <MealCardSkeleton key={index} />
        ))}
      </section>
      <div
        className="fixed bottom-0 left-0 right-0 flex justify-center gap-2 pb-2 md:static"
        role="toolbar"
        aria-label="Actions du planning"
      >
        <Skeleton className="h-10 w-52" />
        <Skeleton className="h-10 w-40" />
      </div>
    </>
  );
}
