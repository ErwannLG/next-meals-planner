import { shuffleArray } from './utils'
import { FoodType } from '@/types'

export default async function getRandomSeasonalDishes() {
	const dishes: FoodType[] = await fetch(
		'http://localhost:3000/api/dishes/seasonal'
	).then((res) => res.json())

	const shuffledDishes = shuffleArray(dishes)

	return shuffledDishes
}
