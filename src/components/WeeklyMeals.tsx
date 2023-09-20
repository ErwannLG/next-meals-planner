'use client'

import { useSelectedDays } from './SelectedDaysProvider'
import { MealType } from '@/types'
import Meal from './Meal'

interface Props {
	meals: MealType[]
}

export default function WeeklyMeals({ meals }: Props) {
	const daysContext = useSelectedDays()

	if (!daysContext) {
		return null
	}

	const { selectedDays } = daysContext

	console.log({ meals })

	return (
		<>
			<h1>Weekly Meals</h1>
			<div className='flex gap-6 justify-center'>
				{selectedDays.map((day, index) => (
					<Meal key={index} day={day} meal={meals[index]} />
					// 	<h2>{day}</h2>
					// 	<div>{dishes[index].name}</div>
					// </Meal>
				))}
			</div>
		</>
	)
}
