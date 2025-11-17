import { shuffleArray } from './utils'
import { FoodType } from '@/types'
import { getBaseUrl } from './api-url'

export default async function getRandomSeasonalDishes(): Promise<FoodType[]> {
	try {
		const response = await fetch(`${getBaseUrl()}/api/dishes/seasonal`, {
			cache: 'no-store',
		})

		if (!response.ok) {
			throw new Error(
				`Failed to fetch seasonal dishes: ${response.status} ${response.statusText}`
			)
		}

		const dishes: FoodType[] = await response.json()

		if (!Array.isArray(dishes) || dishes.length === 0) {
			console.warn('No seasonal dishes found, returning empty array')
			return []
		}

		return shuffleArray(dishes)
	} catch (error) {
		console.error('Error fetching seasonal dishes:', error)
		return []
	}
}
