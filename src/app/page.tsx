import getRandomDishes from '@/lib/getRandomDishes'
import getRandomSeasonalDishes from '@/lib/getRandomSeasonalDishes'
import getRandomVegetables from '@/lib/getRandomVegetables'
import getRandomSeasonalVegetables from '@/lib/getRandomSeasonalVegetables'
import Options from '@/components/Options'
import WeeklyMeals from '@/components/WeeklyMeals'
import { ModeToggle } from '@/components/ModeToggle'
import { UserButton, SignInButton, currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const user = await currentUser()
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
			<nav className="flex justify-end gap-2">
				<ModeToggle />
				<Options
					dishesSeasons={dishesSeasons}
					vegetablesSeasons={vegetablesSeasons}
				/>
				{user && (
					<Link href="/admin">
						<Button variant="outline" size="icon">
							<Settings className="h-[1.2rem] w-[1.2rem]" />
							<span className="sr-only">Admin Dashboard</span>
						</Button>
					</Link>
				)}
				<SignInButton />
				<UserButton afterSignOutUrl="/" />
			</nav>
			<WeeklyMeals dishes={dishes} vegetables={vegetables} />
		</main>
	)
}
