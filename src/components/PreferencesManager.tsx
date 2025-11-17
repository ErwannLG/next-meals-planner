'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Heart, X, Trash2 } from 'lucide-react'

type PreferenceType = 'FAVORITE' | 'DISLIKED'

interface DishPreference {
	id: number
	dishId: number
	type: PreferenceType
	dish: {
		id: number
		name: string
	}
}

interface VegetablePreference {
	id: number
	vegetableId: number
	type: PreferenceType
	vegetable: {
		id: number
		name: string
	}
}

export default function PreferencesManager() {
	const [dishPreferences, setDishPreferences] = useState<DishPreference[]>([])
	const [vegetablePreferences, setVegetablePreferences] = useState<VegetablePreference[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchPreferences()
	}, [])

	async function fetchPreferences() {
		try {
			const [dishRes, vegRes] = await Promise.all([
				fetch('/api/preferences/dishes'),
				fetch('/api/preferences/vegetables'),
			])

			if (dishRes.ok) {
				const dishes = await dishRes.json()
				setDishPreferences(dishes)
			}

			if (vegRes.ok) {
				const vegetables = await vegRes.json()
				setVegetablePreferences(vegetables)
			}
		} catch (error) {
			console.error('Error fetching preferences:', error)
		} finally {
			setLoading(false)
		}
	}

	async function removePreference(type: 'dish' | 'vegetable', id: number) {
		try {
			const endpoint = type === 'dish'
				? `/api/preferences/dishes?dishId=${id}`
				: `/api/preferences/vegetables?vegetableId=${id}`

			const response = await fetch(endpoint, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Failed to remove preference')
			}

			// Update local state
			if (type === 'dish') {
				setDishPreferences((prev) => prev.filter((p) => p.dishId !== id))
			} else {
				setVegetablePreferences((prev) => prev.filter((p) => p.vegetableId !== id))
			}
		} catch (error) {
			console.error('Error removing preference:', error)
			alert('Erreur lors de la suppression de la préférence')
		}
	}

	const favoriteDishes = dishPreferences.filter((p) => p.type === 'FAVORITE')
	const dislikedDishes = dishPreferences.filter((p) => p.type === 'DISLIKED')
	const favoriteVegetables = vegetablePreferences.filter((p) => p.type === 'FAVORITE')
	const dislikedVegetables = vegetablePreferences.filter((p) => p.type === 'DISLIKED')

	if (loading) {
		return (
			<div className="flex justify-center py-8">
				<p className="text-muted-foreground">Chargement...</p>
			</div>
		)
	}

	return (
		<div className="grid gap-6 md:grid-cols-2">
			{/* Favorite Dishes */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Heart className="text-red-500 fill-red-500" size={20} />
						Plats favoris ({favoriteDishes.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					{favoriteDishes.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							Aucun plat favori pour le moment
						</p>
					) : (
						<ul className="space-y-2">
							{favoriteDishes.map((pref) => (
								<li
									key={pref.id}
									className="flex items-center justify-between rounded-lg border p-3"
								>
									<span>{pref.dish.name}</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removePreference('dish', pref.dishId)}
										aria-label="Supprimer des favoris"
									>
										<Trash2 size={16} className="text-muted-foreground" />
									</Button>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>

			{/* Disliked Dishes */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<X className="text-gray-600" size={20} />
						Plats non aimés ({dislikedDishes.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					{dislikedDishes.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							Aucun plat non aimé pour le moment
						</p>
					) : (
						<ul className="space-y-2">
							{dislikedDishes.map((pref) => (
								<li
									key={pref.id}
									className="flex items-center justify-between rounded-lg border p-3"
								>
									<span>{pref.dish.name}</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removePreference('dish', pref.dishId)}
										aria-label="Retirer de la liste"
									>
										<Trash2 size={16} className="text-muted-foreground" />
									</Button>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>

			{/* Favorite Vegetables */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Heart className="text-red-500 fill-red-500" size={20} />
						Légumes favoris ({favoriteVegetables.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					{favoriteVegetables.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							Aucun légume favori pour le moment
						</p>
					) : (
						<ul className="space-y-2">
							{favoriteVegetables.map((pref) => (
								<li
									key={pref.id}
									className="flex items-center justify-between rounded-lg border p-3"
								>
									<span>{pref.vegetable.name}</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removePreference('vegetable', pref.vegetableId)}
										aria-label="Supprimer des favoris"
									>
										<Trash2 size={16} className="text-muted-foreground" />
									</Button>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>

			{/* Disliked Vegetables */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<X className="text-gray-600" size={20} />
						Légumes non aimés ({dislikedVegetables.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					{dislikedVegetables.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							Aucun légume non aimé pour le moment
						</p>
					) : (
						<ul className="space-y-2">
							{dislikedVegetables.map((pref) => (
								<li
									key={pref.id}
									className="flex items-center justify-between rounded-lg border p-3"
								>
									<span>{pref.vegetable.name}</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removePreference('vegetable', pref.vegetableId)}
										aria-label="Retirer de la liste"
									>
										<Trash2 size={16} className="text-muted-foreground" />
									</Button>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
