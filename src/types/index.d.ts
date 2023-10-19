export type FoodType = {
	id: number
	name: string
	seasons: string[]
}

export type MealItemType = {
	id: number
	name: string
	locked: boolean
}

export type MealType = {
	id: number
	dish: MealItemType
	vegetable: MealItemType
}
