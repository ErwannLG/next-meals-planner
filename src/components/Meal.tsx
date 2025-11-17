import { MealType } from '@/types'

import MealItem from './MealItem'

interface MealProps {
	index: number
	day: string
	meal: MealType
	toggleLock: (itemType: 'dish' | 'vegetable', index: number) => void
	onPreferenceChange?: (itemType: 'dish' | 'vegetable', itemId: number, preference: 'FAVORITE' | 'DISLIKED' | null) => void
}

export default function Meal({ index, day, meal, toggleLock, onPreferenceChange }: MealProps) {
	const { dish, vegetable } = meal

	return (
		<article
			className="shrink-0 grow-0 basis-auto rounded-lg border px-4 py-4 shadow-lg md:w-80 lg:w-64"
			aria-labelledby={`day-${index}-heading`}
		>
			<h2
				id={`day-${index}-heading`}
				className="semi-bold text-center text-lg uppercase tracking-tight text-muted-foreground"
			>
				{day}
			</h2>
			<div className="space-y-4 pt-2">
				<MealItem
					index={index}
					itemId={dish.id}
					itemName={dish.name}
					itemType="dish"
					locked={dish.locked}
					preference={dish.preference}
					toggleLock={toggleLock}
					onPreferenceChange={onPreferenceChange}
				/>
				<MealItem
					index={index}
					itemId={vegetable.id}
					itemName={vegetable.name}
					itemType="vegetable"
					locked={vegetable.locked}
					preference={vegetable.preference}
					toggleLock={toggleLock}
					onPreferenceChange={onPreferenceChange}
				/>
			</div>
		</article>
	)
}
