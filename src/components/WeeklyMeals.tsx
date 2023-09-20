'use client'

import { useSelectedDays } from './SelectedDaysProvider'
import Meal from './Meal'

export default function WeeklyMeals({ meals }) {
	const daysContext = useSelectedDays()

	if (!daysContext) {
		return null
	}

	const { selectedDays } = daysContext

	// console.log('dishes from WeeklyMeals', dishes)

	return (
		<>
			<h1>Weekly Meals</h1>
			<div className='flex gap-6 justify-center'>
				{selectedDays.map((day, index) => (
					<Meal
						key={index}
						day={day}
						dish={meals[index].dish.name}
						vegetable={meals[index].vegetable.name}
					/>
					// 	<h2>{day}</h2>
					// 	<div>{dishes[index].name}</div>
					// </Meal>
				))}
			</div>
		</>
	)
}
