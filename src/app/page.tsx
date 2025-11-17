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
import { Settings, History } from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Logo } from '@/components/Logo'

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
			<header className="mb-6">
				<div className="flex items-center justify-between gap-4 mb-4">
					<Logo size="md" />
					<nav className="flex gap-2">
				<ModeToggle />
				<Options
					dishesSeasons={dishesSeasons}
					vegetablesSeasons={vegetablesSeasons}
				/>
				{user && (
					<>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link href="/history">
									<Button variant="outline" size="icon" aria-label="Voir l'historique de mes menus">
										<History className="h-[1.2rem] w-[1.2rem]" />
										<span className="sr-only">Historique des menus</span>
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Historique des menus</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link href="/admin">
									<Button variant="outline" size="icon" aria-label="Dashboard Admin">
										<Settings className="h-[1.2rem] w-[1.2rem]" />
										<span className="sr-only">Admin Dashboard</span>
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Admin Dashboard</p>
							</TooltipContent>
						</Tooltip>
					</>
				)}
						<SignInButton />
						<UserButton afterSignOutUrl="/" />
					</nav>
				</div>
				<div className="text-center">
					<h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
						Planifiez vos repas de la semaine
					</h1>
					<p className="text-muted-foreground text-sm md:text-base">
						Découvrez des suggestions de plats et légumes de saison pour simplifier votre quotidien
					</p>
				</div>
			</header>
			<WeeklyMeals dishes={dishes} vegetables={vegetables} />
		</main>
	)
}
