import getRandomDishes from '@/lib/getRandomDishes'
import getRandomSeasonalDishes from '@/lib/getRandomSeasonalDishes'
import getRandomVegetables from '@/lib/getRandomVegetables'
import getRandomSeasonalVegetables from '@/lib/getRandomSeasonalVegetables'
import Options from '@/components/Options'
import WeeklyMeals from '@/components/WeeklyMeals'
import { ModeToggle } from '@/components/ModeToggle'
import { SignInButton, SignOutButton } from '@/components/logButtons'
import AuthCheck from '@/components/AuthCheck'
import AddMenu from '@/components/AddMenu'
import AppNav from '@/components/AppNav'

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const dishesSeasons = (searchParams.dishesSeasons || 'current') as string
	const vegetablesSeasons = (searchParams.vegetablesSeasons ||
		'current') as string

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
			<AppNav
				dishesSeasons={dishesSeasons}
				vegetablesSeasons={vegetablesSeasons}
			/>
			<WeeklyMeals dishes={dishes} vegetables={vegetables} />
		</main>
	)
}
