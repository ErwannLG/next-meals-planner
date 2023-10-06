'use client'

import React from 'react'
import { MealType } from '@/types'
import getRandomDishes from '@/lib/getRandomDishes'
import getRandomVegetables from '@/lib/getRandomVegetables'

const MealsContext = React.createContext<MealType[] | null>(null)

function MealsProvider({ children }: { children: React.ReactNode }) {
	const dishes = await getRandomDishes()
	const vegetables = await getRandomVegetables()

	const meals = []
	for (let id = 0; id <= 6; id++) {
		const meal = {
			id,
			dish: { ...dishes[id], locked: false },
			vegetable: { ...vegetables[id], locked: false },
		}
		meals.push(meal)
	}

	const [meals, setMeals] = React.useState()

	return (
		<MealsContext.Provider value={{ meals, setMeals }}>
			{children}
		</MealsContext.Provider>
	)
}

export function useMealsContext() {
	const context = React.useContext(MealsContext)

	if (context === undefined) {
		throw new Error(
			'useSelectedDaysContext must be used within a SelectedDaysProvider'
		)
	}

	return context
}

export default MealsProvider
