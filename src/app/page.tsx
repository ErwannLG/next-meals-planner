import getRandomDishes from './lib/getRandomDishes'

interface Dish {
	id: number
	name: string
	type: string
	seasons: string[]
}

export default async function Home() {
	const dishes = await getRandomDishes()
	console.log({ dishes })
	console.log('oi')

	return (
		<main>
			<h1>Oi</h1>
			{dishes.map((dish: Dish) => (
				<div key={dish.id}>
					<h2>{dish.name}</h2>
				</div>
			))}
		</main>
	)
}
