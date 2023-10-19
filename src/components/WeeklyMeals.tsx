'use client'

import { useState } from 'react'
import { MealType, MealItemType, FoodType } from '@/types'
import { useSelectedDays } from '@/contexts/selectedDays-context'
import Meal from './Meal'
import { getRandomItemFromArray, shuffleArray } from '@/lib/utils'
import { Button } from './ui/button'
import { RefreshCw } from 'lucide-react'

interface Props {
	dishes: FoodType[]
	vegetables: FoodType[]
}

export default function WeeklyMeals({ dishes, vegetables }: Props) {
	console.log({ dishes }, { vegetables })

	// create meals from the dishes and vegetables props to set the initial state
	const meals = []
	for (let id = 0; id <= 6; id++) {
		const meal = {
			id,
			dish: { ...dishes[id], locked: false },
			vegetable: { ...vegetables[id], locked: false },
		}
		meals.push(meal)
	}

	const [weeklyMeals, setWeeklyMeals] = useState<MealType[]>(meals)

	const daysContext = useSelectedDays()
	if (!daysContext) {
		return null
	}
	// const { selectedDays } = daysContext
	const { days } = daysContext
	console.log({ days })

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

	function getRandomMeals() {
		// get dishes from meals as an array
		const previousDishes = weeklyMeals.map((meal) => meal.dish)
		// remove locked dishes from the previousDishes array so you don't get duplicates
		const availableDishes = previousDishes.filter((dish) => !dish.locked)
		const newRandomDishes = shuffleArray(availableDishes)

		const newMeals: MealType[] = weeklyMeals.map((meal) => {
			// new dish if unlocked, otherwise keep the same dish. using pop so you don't get duplicates
			const newDish = meal.dish.locked ? meal.dish : newRandomDishes.pop()
			// new random vegetable if unlocked
			const newVegetable = meal.vegetable.locked
				? meal.vegetable
				: getRandomItemFromArray(vegetables)

			return {
				...meal,
				dish: newDish as MealItemType,
				vegetable: newVegetable as MealItemType,
			}
		})

		setWeeklyMeals(newMeals)
	}

	return (
		<>
			<div className="my-auto flex flex-col justify-center gap-6 py-4 md:flex-row md:flex-wrap lg:gap-4">
				{days.map((day, index) => (
					<Meal
						key={index}
						day={day}
						index={index}
						meal={weeklyMeals[index]}
						toggleLock={toggleLock}
					/>
				))}
			</div>
			<div className="fixed bottom-0 left-0 right-0 flex justify-center pb-2 md:static">
				<Button onClick={getRandomMeals} className="gap-2">
					<RefreshCw size={24} />
					Nouvelles suggestions
				</Button>
				<div className="flex items-center space-x-2"></div>
			</div>
		</>
	)
}
