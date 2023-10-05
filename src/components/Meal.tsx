import { MealType } from '@/types'

import MealItem from './MealItem'

interface MealProps {
	day: string
	meal: MealType & { dish: { name: string }; vegetable: { name: string } }
}

export default function Meal({ day, meal }: MealProps) {
	const { dish, vegetable } = meal

	return (
		<div className='flex-1 space-y-4 px-4 py-6 border rounded-lg shadow'>
			<h2 className='text-2xl semi-bold tracking-tight uppercase text-slate-600 text-center'>
				{day}
			</h2>
			<MealItem itemName={dish.name} itemType='dish' />
			<MealItem itemName={vegetable.name} itemType='vegetable' />
		</div>
	)
}
