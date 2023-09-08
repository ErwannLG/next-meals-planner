import getRandomDishes from '@/lib/getRandomDishes'
import getRandomVegetables from '@/lib/getRandomVegetables'
import { Dish, Vegetable } from '@/types'

export default async function Home() {
	const dishes = await getRandomDishes()
	const vegetables = await getRandomVegetables()

	return (
		<main>
			<h1>Oi</h1>
			{dishes.map((dish: Dish) => (
				<div key={dish.id}>
					<h2>{dish.name}</h2>
				</div>
			))}
			{vegetables.map((vegetable: Vegetable) => (
				<div key={vegetable.id}>
					<h2>{vegetable.name}</h2>
				</div>
			))}
		</main>
	)
}
