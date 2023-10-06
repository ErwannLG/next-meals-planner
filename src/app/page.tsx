import getRandomDishes from '@/lib/getRandomDishes'
import getRandomVegetables from '@/lib/getRandomVegetables'
import DaysSelector from '@/components/DaysSelector'
import WeeklyMeals from '@/components/WeeklyMeals'

export default async function Home() {
	const dishes = await getRandomDishes()
	const vegetables = await getRandomVegetables()

	const meals = []
	for (let id = 0; id <= 6; id++) {
		const meal = {
			id,
			dish: { ...dishes[id], locked: false },
			vegetable: { ...vegetables[id], locked: false },
		}
		meals.push(meal)
	}

	return (
		<main>
			<DaysSelector />
			<WeeklyMeals meals={meals} />
		</main>
	)
}
