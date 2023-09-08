import { shuffleArray } from './utils'
import { Vegetable } from '@/types'

export default async function getRandomVegetables() {
	const vegetables: Vegetable[] = await fetch(
		'http://localhost:3000/api/vegetables'
	).then((res) => res.json())

	const shuffledVegetables = shuffleArray(vegetables)

	return shuffledVegetables
}
