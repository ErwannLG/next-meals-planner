import getRandomDishes from '@/lib/getRandomDishes'
import getRandomVegetables from '@/lib/getRandomVegetables'
import DaysSelector from '@/components/DaysSelector'
import WeeklyMeals from '@/components/WeeklyMeals'
import { log } from 'console'

export default async function Home() {
	const dishes = await getRandomDishes()
	const vegetables = await getRandomVegetables()

	console.log({ dishes, vegetables })

	const meals = []
	for (let id = 0; id <= 6; id++) {
		const meal = {
			id,
			dish: { ...dishes[id], locked: false },
			vegetable: { ...vegetables[id], locked: false },
		}
		meals.push(meal)
	}

	console.log({ meals })

	// const meals = [
	// 	{
	// 		id: 0,
	// 		dish: {},
	// 		vegetable: {},
	// 	},
	// ]

	return (
		<main>
			<DaysSelector />
			<WeeklyMeals dishes={dishes} vegetables={vegetables} />
			{/* <h1>Oi</h1>
			{dishes.map((dish: Dish) => (
				<div key={dish.id}>
					<h2>{dish.name}</h2>
				</div>
			))}
			{vegetables.map((vegetable: Vegetable) => (
				<div key={vegetable.id}>
					<h2>{vegetable.name}</h2>
				</div>
			))} */}
		</main>
	)
}
