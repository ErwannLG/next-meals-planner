import getRandomDishes from '@/lib/getRandomDishes'
import getRandomSeasonalDishes from '@/lib/getRandomSeasonalDishes'
import getRandomVegetables from '@/lib/getRandomVegetables'
import getRandomSeasonalVegetables from '@/lib/getRandomSeasonalVegetables'
import SeasonsSelector from '@/components/SeasonsSelector'
import DaysSelector from '@/components/DaysSelector'
import WeeklyMeals from '@/components/WeeklyMeals'

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const dishesSeasons = (searchParams.dishesSeasons || 'current') as string
	const vegetablesSeasons = (searchParams.vegetablesSeasons ||
		'current') as string

	console.log({ dishesSeasons }, { vegetablesSeasons })

	const dishes =
		dishesSeasons === 'all'
			? await getRandomDishes()
			: await getRandomSeasonalDishes()
	const vegetables =
		vegetablesSeasons === 'all'
			? await getRandomVegetables()
			: await getRandomSeasonalVegetables()

	return (
		<main className="flex min-h-[95dvh] flex-col">
			<SeasonsSelector
				dishesSeasons={dishesSeasons}
				vegetablesSeasons={vegetablesSeasons}
			/>
			<DaysSelector />
			<WeeklyMeals dishes={dishes} vegetables={vegetables} />
		</main>
	)
}
