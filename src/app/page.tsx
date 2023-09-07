import getRandomDishes from './lib/getRandomDishes'

export default function Home() {
	const dishes = getRandomDishes()
	console.log({ dishes })
	console.log('oi')

	return (
		<main>
			<h1>Oi</h1>
		</main>
	)
}
