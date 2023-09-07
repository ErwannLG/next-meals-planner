interface Dish {
	id: number
	name: string
	type: string
	seasons: string[]
}

export default async function getRandomDishes() {
	const dishes: Dish[] = await fetch('http://localhost:3000/api/dishes').then(
		(res) => res.json()
	)

	console.log({ dishes })
}
