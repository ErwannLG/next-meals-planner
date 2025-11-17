import { shuffleArray } from './utils'
import { FoodType } from '@/types'
import { getBaseUrl } from './api-url'

export default async function getRandomDishes(): Promise<FoodType[]> {
	try {
		const response = await fetch(`${getBaseUrl()}/api/dishes`, {
			cache: 'no-store',
		})

		if (!response.ok) {
			throw new Error(
				`Failed to fetch dishes: ${response.status} ${response.statusText}`
			)
		}

		const dishes: FoodType[] = await response.json()

		if (!Array.isArray(dishes) || dishes.length === 0) {
			console.warn('No dishes found, returning empty array')
			return []
		}

		return shuffleArray(dishes)
	} catch (error) {
		console.error('Error fetching dishes:', error)
		return []
	}
}
