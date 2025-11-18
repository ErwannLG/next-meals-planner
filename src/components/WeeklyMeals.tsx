'use client'

import { useState, useEffect } from 'react'
import { MealType, MealItemType, FoodType } from '@/types'
import { useSelectedDays } from '@/contexts/selectedDays-context'
import { useUser } from '@clerk/nextjs'
import Meal from './Meal'
import { shuffleArray } from '@/lib/utils'
import { Button } from './ui/button'
import { RefreshCw, Check } from 'lucide-react'
import { toast } from 'sonner'

type PreferenceType = 'FAVORITE' | 'DISLIKED'

interface UserPreference {
	id: number
	userId: string
	dishId?: number
	vegetableId?: number
	type: PreferenceType
	dish?: { id: number; name: string }
	vegetable?: { id: number; name: string }
}

interface Props {
	dishes: FoodType[]
	vegetables: FoodType[]
}

export default function WeeklyMeals({ dishes, vegetables }: Props) {
	const { isSignedIn } = useUser()
	const daysContext = useSelectedDays()
	const [dishPreferences, setDishPreferences] = useState<Map<number, PreferenceType>>(new Map())
	const [vegetablePreferences, setVegetablePreferences] = useState<Map<number, PreferenceType>>(new Map())

	// create meals from the dishes and vegetables props to set the initial state
	const createMeals = () => {
		const meals = []
		for (let id = 0; id <= 6; id++) {
			const dishPref = dishPreferences.get(dishes[id].id)
			const vegPref = vegetablePreferences.get(vegetables[id].id)

			const meal = {
				id,
				dish: { ...dishes[id], locked: false, preference: dishPref || null },
				vegetable: { ...vegetables[id], locked: false, preference: vegPref || null },
			}
			meals.push(meal)
		}
		return meals
	}

	const [weeklyMeals, setWeeklyMeals] = useState<MealType[]>(createMeals())
	const [isSaving, setIsSaving] = useState(false)
	const [saveSuccess, setSaveSuccess] = useState(false)

	if (!daysContext) {
		return null
	}
	const { days } = daysContext

	// Fetch user preferences on mount
	useEffect(() => {
		if (!isSignedIn) return

		async function fetchPreferences() {
			try {
				const [dishPrefsResponse, vegPrefsResponse] = await Promise.all([
					fetch('/api/preferences/dishes'),
					fetch('/api/preferences/vegetables'),
				])

				if (dishPrefsResponse.ok) {
					const dishPrefs: UserPreference[] = await dishPrefsResponse.json()
					const dishPrefMap = new Map<number, PreferenceType>()
					dishPrefs.forEach((pref) => {
						if (pref.dishId) {
							dishPrefMap.set(pref.dishId, pref.type)
						}
					})
					setDishPreferences(dishPrefMap)
				}

				if (vegPrefsResponse.ok) {
					const vegPrefs: UserPreference[] = await vegPrefsResponse.json()
					const vegPrefMap = new Map<number, PreferenceType>()
					vegPrefs.forEach((pref) => {
						if (pref.vegetableId) {
							vegPrefMap.set(pref.vegetableId, pref.type)
						}
					})
					setVegetablePreferences(vegPrefMap)
				}
			} catch (error) {
				console.error('Error fetching preferences:', error)
			}
		}

		fetchPreferences()
	}, [isSignedIn])

	// Update meals when preferences change
	useEffect(() => {
		setWeeklyMeals((prevMeals) =>
			prevMeals.map((meal) => ({
				...meal,
				dish: {
					...meal.dish,
					preference: dishPreferences.get(meal.dish.id) || null,
				},
				vegetable: {
					...meal.vegetable,
					preference: vegetablePreferences.get(meal.vegetable.id) || null,
				},
			}))
		)
	}, [dishPreferences, vegetablePreferences])

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
		// remove locked dishes and disliked dishes from the previousDishes array
		const availableDishes = previousDishes.filter(
			(dish) => !dish.locked && dish.preference !== 'DISLIKED'
		)
		const newRandomDishes = shuffleArray(availableDishes)

		// get vegetables from meals as an array
		const previousVegetables = weeklyMeals.map((meal) => meal.vegetable)
		// remove locked vegetables and disliked vegetables from the previousVegetables array
		const availableVegetables = previousVegetables.filter(
			(vegetable) => !vegetable.locked && vegetable.preference !== 'DISLIKED'
		)
		const newRandomVegetables = shuffleArray(availableVegetables)

		const newMeals: MealType[] = weeklyMeals.map((meal) => {
			// new dish if unlocked, otherwise keep the same dish. using pop so you don't get duplicates
			// if the current dish is disliked, force a replacement
			const shouldReplaceDish = !meal.dish.locked || meal.dish.preference === 'DISLIKED'
			const newDish = shouldReplaceDish && newRandomDishes.length > 0
				? newRandomDishes.pop()
				: meal.dish

			// new vegetable if unlocked, otherwise keep the same vegetable. using pop so you don't get duplicates
			// if the current vegetable is disliked, force a replacement
			const shouldReplaceVegetable = !meal.vegetable.locked || meal.vegetable.preference === 'DISLIKED'
			const newVegetable = shouldReplaceVegetable && newRandomVegetables.length > 0
				? newRandomVegetables.pop()
				: meal.vegetable

			return {
				...meal,
				dish: newDish as MealItemType,
				vegetable: newVegetable as MealItemType,
			}
		})

		setWeeklyMeals(newMeals)
	}

	async function handlePreferenceChange(
		itemType: 'dish' | 'vegetable',
		itemId: number,
		preference: 'FAVORITE' | 'DISLIKED' | null
	) {
		if (!isSignedIn) {
			alert('Vous devez être connecté pour gérer vos préférences')
			return
		}

		try {
			const endpoint = itemType === 'dish'
				? '/api/preferences/dishes'
				: '/api/preferences/vegetables'

			if (preference === null) {
				// Delete preference
				const queryParam = itemType === 'dish' ? 'dishId' : 'vegetableId'
				const response = await fetch(`${endpoint}?${queryParam}=${itemId}`, {
					method: 'DELETE',
				})

				if (!response.ok) {
					throw new Error('Erreur lors de la suppression de la préférence')
				}

				// Update local state
				if (itemType === 'dish') {
					setDishPreferences((prev) => {
						const newMap = new Map(prev)
						newMap.delete(itemId)
						return newMap
					})
				} else {
					setVegetablePreferences((prev) => {
						const newMap = new Map(prev)
						newMap.delete(itemId)
						return newMap
					})
				}
			} else {
				// Create or update preference
				const body = itemType === 'dish'
					? { dishId: itemId, type: preference }
					: { vegetableId: itemId, type: preference }

				const response = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				})

				if (!response.ok) {
					throw new Error('Erreur lors de la sauvegarde de la préférence')
				}

				// Update local state
				if (itemType === 'dish') {
					setDishPreferences((prev) => new Map(prev).set(itemId, preference))
				} else {
					setVegetablePreferences((prev) => new Map(prev).set(itemId, preference))
				}
			}
		} catch (error) {
			console.error('Error updating preference:', error)
			alert('Erreur lors de la mise à jour de la préférence')
		}
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
						onPreferenceChange={isSignedIn ? handlePreferenceChange : undefined}
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
