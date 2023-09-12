'use client'

import { useSelectedDays } from './SelectedDaysProvider'

export default function WeeklyMeals({ dishes, vegetables }) {
	const daysContext = useSelectedDays()

	if (!daysContext) {
		return null
	}

	const { selectedDays } = daysContext

	console.log('dishes from WeeklyMeals', dishes)

	return (
		<>
			<h1>Weekly Meals</h1>
			{selectedDays.map((day, index) => (
				<div key={index}>
					<h2>{day}</h2>
					<div>{dishes[index].name}</div>
				</div>
			))}
		</>
	)
}
