'use client'

import { useState } from 'react'
import { MealType, MealItemType, FoodType } from '@/types'
import { useSelectedDays } from '@/contexts/selectedDays-context'
import { useUser } from '@clerk/nextjs'
import Meal from './Meal'
import { shuffleArray } from '@/lib/utils'
import { Button } from './ui/button'
import { RefreshCw, Check } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
	dishes: FoodType[]
	vegetables: FoodType[]
}

export default function WeeklyMeals({ dishes, vegetables }: Props) {
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
	const [isSaving, setIsSaving] = useState(false)
	const [saveSuccess, setSaveSuccess] = useState(false)

	const { isSignedIn } = useUser()
	const daysContext = useSelectedDays()
	if (!daysContext) {
		return null
	}
	const { days } = daysContext

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

		// get vegetables from meals as an array
		const previousVegetables = weeklyMeals.map((meal) => meal.vegetable)
		// remove locked vegetables from the previousVegetables array so you don't get duplicates
		const availableVegetables = previousVegetables.filter(
			(vegetable) => !vegetable.locked
		)
		const newRandomVegetables = shuffleArray(availableVegetables)

		const newMeals: MealType[] = weeklyMeals.map((meal) => {
			// new dish if unlocked, otherwise keep the same dish. using pop so you don't get duplicates
			const newDish = meal.dish.locked ? meal.dish : newRandomDishes.pop()
			// new vegetable if unlocked, otherwise keep the same vegetable. using pop so you don't get duplicates
			const newVegetable = meal.vegetable.locked
				? meal.vegetable
				: newRandomVegetables.pop()

			return {
				...meal,
				dish: newDish as MealItemType,
				vegetable: newVegetable as MealItemType,
			}
		})

		setWeeklyMeals(newMeals)
	}

	async function saveMenu() {
		if (!isSignedIn) {
			toast.error('Vous devez être connecté pour sauvegarder un menu')
			return
		}

		setIsSaving(true)
		setSaveSuccess(false)

		try {
			const menuData = {
				numberOfDays: days.length,
				items: weeklyMeals.slice(0, days.length).map((meal, index) => ({
					dayNumber: index + 1,
					dishId: meal.dish.id,
					vegetableId: meal.vegetable.id,
				})),
			}

			const response = await fetch('/api/menu-history', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(menuData),
			})

			if (!response.ok) {
				throw new Error('Erreur lors de la sauvegarde')
			}

			toast.success('Menu sauvegardé avec succès')
			setSaveSuccess(true)
			setTimeout(() => setSaveSuccess(false), 3000)
		} catch (error) {
			console.error('Error saving menu:', error)
			toast.error('Erreur lors de la sauvegarde du menu')
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<>
			<section
				className="my-auto flex flex-col justify-center gap-6 py-4 md:flex-row md:flex-wrap lg:gap-4"
				aria-label="Planning des repas de la semaine"
			>
				{days.map((day, index) => (
					<Meal
						key={index}
						day={day}
						index={index}
						meal={weeklyMeals[index]}
						toggleLock={toggleLock}
					/>
				))}
			</section>
			<div
				className="fixed bottom-0 left-0 right-0 flex justify-center gap-2 pb-2 md:static"
				role="toolbar"
				aria-label="Actions du planning"
			>
				<Button
					onClick={getRandomMeals}
					className="gap-2"
					aria-label="Générer de nouvelles suggestions de repas"
				>
					<RefreshCw size={24} aria-hidden="true" />
					Nouvelles suggestions
				</Button>
				{isSignedIn && (
					<Button
						onClick={saveMenu}
						disabled={isSaving}
						className="gap-2"
						variant={saveSuccess ? 'default' : 'outline'}
						aria-label="Valider et sauvegarder ce menu"
					>
						<Check size={24} aria-hidden="true" />
						{isSaving ? 'Sauvegarde...' : saveSuccess ? 'Sauvegardé !' : 'Valider ce menu'}
					</Button>
				)}
			</div>
		</>
	)
}
