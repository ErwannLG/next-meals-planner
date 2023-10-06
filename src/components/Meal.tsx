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
		<div className='flex-1 space-y-4 px-4 py-6 border rounded-lg shadow'>
			<h2 className='text-2xl semi-bold tracking-tight uppercase text-slate-600 text-center'>
				{day}
			</h2>
			<MealItem
				index={index}
				itemName={dish.name}
				itemType='dish'
				locked={dish.locked}
				toggleLock={toggleLock}
			/>
			<MealItem
				index={index}
				itemName={vegetable.name}
				itemType='vegetable'
				locked={vegetable.locked}
				toggleLock={toggleLock}
			/>
		</div>
	)
}
