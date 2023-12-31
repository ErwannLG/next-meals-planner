import { MealType } from '@/types'

import MealItem from './MealItem'

interface MealProps {
	index: number
	day: string
	meal: MealType
	toggleLock: (itemType: 'dish' | 'vegetable', index: number) => void
}

export default function Meal({ index, day, meal, toggleLock }: MealProps) {
	const { dish, vegetable } = meal

	return (
		<div className="shrink-0 grow-0 basis-auto rounded-lg border px-4 py-4 shadow-lg md:w-80 lg:w-64">
			<h2 className="semi-bold text-center text-lg uppercase tracking-tight text-muted-foreground">
				{day}
			</h2>
			<article className="space-y-4 pt-2">
				<MealItem
					index={index}
					itemName={dish.name}
					itemType="dish"
					locked={dish.locked}
					toggleLock={toggleLock}
				/>
				<MealItem
					index={index}
					itemName={vegetable.name}
					itemType="vegetable"
					locked={vegetable.locked}
					toggleLock={toggleLock}
				/>
			</article>
		</div>
	)
}
