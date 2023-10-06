import getRandomDishes from '@/lib/getRandomDishes'
import getRandomVegetables from '@/lib/getRandomVegetables'
import DaysSelector from '@/components/DaysSelector'
import WeeklyMeals from '@/components/WeeklyMeals'

export default async function Home() {
	const dishes = await getRandomDishes()
	const vegetables = await getRandomVegetables()

	return (
		<main>
			<DaysSelector />
			<WeeklyMeals dishes={dishes} vegetables={vegetables} />
		</main>
	)
}
