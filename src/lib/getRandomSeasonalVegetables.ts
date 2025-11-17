import { shuffleArray } from './utils'
import { FoodType } from '@/types'
import { getBaseUrl } from './api-url'

export default async function getRandomSeasonalVegetables(): Promise<
	FoodType[]
> {
	try {
		const response = await fetch(
			`${getBaseUrl()}/api/vegetables/seasonal`,
			{
				cache: 'no-store',
			}
		)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch seasonal vegetables: ${response.status} ${response.statusText}`
			)
		}

		const vegetables: FoodType[] = await response.json()

		if (!Array.isArray(vegetables) || vegetables.length === 0) {
			console.warn('No seasonal vegetables found, returning empty array')
			return []
		}

		return shuffleArray(vegetables)
	} catch (error) {
		console.error('Error fetching seasonal vegetables:', error)
		return []
	}
}
