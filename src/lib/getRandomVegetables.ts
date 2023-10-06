import { shuffleArray } from './utils'
import { FoodType } from '@/types'

export default async function getRandomVegetables() {
	const vegetables: FoodType[] = await fetch(
		'http://localhost:3000/api/vegetables'
	).then((res) => res.json())

	const shuffledVegetables = shuffleArray(vegetables)

	return shuffledVegetables
}
