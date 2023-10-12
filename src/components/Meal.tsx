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
		<div className="shrink-0 grow-0 basis-auto space-y-4 rounded-lg border px-4 py-6 shadow-lg md:w-80 lg:w-72 ">
			<h2 className="semi-bold text-center text-2xl uppercase tracking-tight text-slate-600">
				{day}
			</h2>
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
		</div>
	)
}
