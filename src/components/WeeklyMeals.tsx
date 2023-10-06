'use client'

import { useSelectedDays } from './SelectedDaysProvider'
import { MealType, MealItemType } from '@/types'
import Meal from './Meal'
import { useState } from 'react'

interface Props {
	meals: MealType[]
}

export default function WeeklyMeals({ meals }: Props) {
	const [weeklyMeals, setWeeklyMeals] = useState<MealType[]>(meals)

	const daysContext = useSelectedDays()
	if (!daysContext) {
		return null
	}
	const { selectedDays } = daysContext

	function toggleLock(itemType: 'dish' | 'vegetable', index: number) {
		let itemsArray: MealItemType[] = []
		if (itemType === 'dish') {
			itemsArray = weeklyMeals.map((meal) => meal.dish)
		} else if (itemType === 'vegetable') {
			itemsArray = weeklyMeals.map((meal) => meal.vegetable)
		}
		// for the selected dish/vegetable from the dishes/vegetables array, toggle the locked property
		const newItems = itemsArray.map((item, i) => {
			if (i === index) {
				return { ...item, locked: !item.locked }
			}
			return item
		})
		// for the selected meal from the meals array, update the dish/vegetable property
		const newMeals = weeklyMeals.map((meal, i) => {
			if (i === index) {
				if (itemType === 'dish') {
					return { ...meal, dish: newItems[index] }
				} else if (itemType === 'vegetable') {
					return { ...meal, vegetable: newItems[index] }
				}
			}
			return meal
		})

		setWeeklyMeals(newMeals)
	}

	console.log({ weeklyMeals })

	return (
		<>
			<h1>Weekly Meals</h1>
			<div className='flex gap-6 justify-center'>
				{selectedDays.map((day, index) => (
					<Meal
						key={day}
						day={day}
						index={index}
						meal={weeklyMeals[index]}
						toggleLock={toggleLock}
					/>
				))}
			</div>
		</>
	)
}
