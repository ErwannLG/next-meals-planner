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
