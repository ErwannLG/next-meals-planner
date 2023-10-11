import getRandomDishes from '@/lib/getRandomDishes'
import getRandomSeasonalDishes from '@/lib/getRandomSeasonalDishes'
import getRandomVegetables from '@/lib/getRandomVegetables'
import getRandomSeasonalVegetables from '@/lib/getRandomSeasonalVegetables'
import DaysSelector from '@/components/DaysSelector'
import WeeklyMeals from '@/components/WeeklyMeals'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: boolean } | undefined
}) {
	const seasonalDishes = (searchParams?.seasonalDishes || true) as boolean
	const seasonalVegetables = (searchParams?.seasonalVegetables ||
		true) as boolean

	console.log({ seasonalDishes }, { seasonalVegetables })

	const dishes = seasonalDishes
		? await getRandomSeasonalDishes()
		: await getRandomDishes()
	const vegetables = seasonalVegetables
		? await getRandomSeasonalVegetables()
		: await getRandomVegetables()

	return (
		<main>
			<div className="flex gap-6">
				<div className="flex flex-col">
					<h2>Plats</h2>
					<div className="flex gap-2">
						<Button
							variant="outline"
							className={`border-2 ${
								seasonalDishes ? 'border-green-600' : 'border-gray-200'
							}`}
							asChild
						>
							<Link
								href={`?${new URLSearchParams({
									seasonalDishes: true,
									seasonalVegetables,
								}).toString()}`}
							>
								Plats de saison
							</Link>
						</Button>
						<Button
							variant="outline"
							className={`border-2 ${
								seasonalDishes === false
									? 'border-gray-200'
									: 'border-green-600'
							}`}
							asChild
						>
							<Link
								href={`?${new URLSearchParams({
									seasonalDishes: false,
									seasonalVegetables,
								})}`}
							>
								Tous les plats
							</Link>
						</Button>
					</div>
				</div>

				<div className="flex flex-col">
					<h2>Légumes</h2>
					<div className="flex gap-2">
						<Button
							variant="outline"
							className={`border-2 ${
								seasonalVegetables ? 'border-green-600' : 'border-gray-200'
							}`}
							asChild
						>
							<Link
								href={`?${new URLSearchParams({
									seasonalDishes,
									seasonalVegetables: true,
								}).toString()}`}
							>
								Légumes de saison
							</Link>
						</Button>
						<Button
							variant="outline"
							className={`border-2 ${
								seasonalVegetables === false
									? 'border-gray-200'
									: 'border-green-600'
							}`}
							asChild
						>
							<Link
								href={`?${new URLSearchParams({
									seasonalDishes,
									seasonalVegetables: false,
								})}`}
							>
								Tous les légumes
							</Link>
						</Button>
					</div>
				</div>
			</div>

			<DaysSelector />
			<WeeklyMeals dishes={dishes} vegetables={vegetables} />
		</main>
	)
}
