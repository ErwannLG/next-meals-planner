export type FoodType = {
	id: number
	name: string
	seasons: string[]
}

export type MealItemType = {
	id: number
	name: string
	locked: boolean
	preference?: 'FAVORITE' | 'DISLIKED' | null
}

export type MealType = {
	id: number
	dish: MealItemType
	vegetable: MealItemType
}

export type MenuItemType = {
	id: number
	dayNumber: number
	dishId: number
	vegetableId: number
	dish: {
		id: number
		name: string
	}
	vegetable: {
		id: number
		name: string
	}
}

export type MenuHistoryType = {
	id: number
	userId: string
	validatedAt: Date
	numberOfDays: number
	items: MenuItemType[]
}

export type ShoppingListItemType = {
	vegetableId: number
	vegetableName: string
	count: number // Number of times this vegetable appears in the menu
}

export type ShoppingListType = {
	menuHistoryId: number
	items: ShoppingListItemType[]
	servings: number // Multiplier for quantities
}
