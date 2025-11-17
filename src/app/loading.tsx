import { Skeleton } from '@/components/ui/skeleton';
import { WeeklyMealsSkeleton } from '@/components/MealCardSkeleton';

export default function Loading() {
	return (
		<main className="flex min-h-[95dvh] flex-col">
			<nav className="flex justify-end gap-2">
				<Skeleton className="h-10 w-10" />
				<Skeleton className="h-10 w-10" />
				<Skeleton className="h-10 w-10" />
				<Skeleton className="h-10 w-10" />
				<Skeleton className="h-8 w-8 rounded-full" />
			</nav>
			<WeeklyMealsSkeleton days={5} />
		</main>
	);
}
