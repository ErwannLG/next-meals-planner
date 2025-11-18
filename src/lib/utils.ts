import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { MenuHistoryType, ShoppingListItemType } from '@/types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getCurrentSeason() {
	const currentMonth = new Date().getMonth() + 1

	if (currentMonth >= 3 && currentMonth <= 5) {
		return 'spring'
	}
	if (currentMonth >= 6 && currentMonth <= 8) {
		return 'summer'
	}
	if (currentMonth >= 9 && currentMonth <= 11) {
		return 'fall'
	}
	if (currentMonth === 12 || currentMonth <= 2) {
		return 'winter'
	}
}

export function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const temp = shuffled[i]
		shuffled[i] = shuffled[j]
		shuffled[j] = temp
	}
	return shuffled
}

export function getRandomItemFromArray<T>(items: T[]): T {
	const randomIndex = Math.floor(Math.random() * items.length)
	return items[randomIndex]
}

/**
 * Aggregates vegetables from a menu history into a shopping list
 * Counts the number of times each vegetable appears
 */
export function aggregateVegetables(menuHistory: MenuHistoryType): ShoppingListItemType[] {
	const vegetableMap = new Map<number, { name: string; count: number }>()

	// Count each vegetable occurrence
	for (const item of menuHistory.items) {
		const existing = vegetableMap.get(item.vegetableId)
		if (existing) {
			existing.count += 1
		} else {
			vegetableMap.set(item.vegetableId, {
				name: item.vegetable.name,
				count: 1,
			})
		}
	}

	// Convert map to array and sort alphabetically
	return Array.from(vegetableMap.entries())
		.map(([vegetableId, { name, count }]) => ({
			vegetableId,
			vegetableName: name,
			count,
		}))
		.sort((a, b) => a.vegetableName.localeCompare(b.vegetableName))
}

/**
 * Formats a shopping list for printing or export
 */
export function formatShoppingListForPrint(
	items: ShoppingListItemType[],
	servings: number = 1
): string {
	const header = `Liste de courses\n${'='.repeat(50)}\n\n`
	const servingsNote = servings !== 1 ? `Pour ${servings} personne(s)\n\n` : '\n'

	const itemsList = items
		.map((item) => {
			const quantity = item.count * servings
			return `☐ ${item.vegetableName} (x${quantity})`
		})
		.join('\n')

	return header + servingsNote + itemsList
}
