import { shuffleArray } from './utils'
import { Dish } from '@/types'

export default async function getRandomDishes() {
	const dishes: Dish[] = await fetch('http://localhost:3000/api/dishes').then(
		(res) => res.json()
	)

	const shuffledDishes = shuffleArray(dishes)

	return shuffledDishes
}
