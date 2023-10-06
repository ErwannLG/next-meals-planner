// export type DishType = {
// 	id: number
// 	name: string
// 	seasons: string[]
// }

// export type VegetableType = {
// 	id: number
// 	name: string
// 	seasons: string[]
// }

export type FoodType = {
	id: number
	name: string
	seasons: string[]
}

export type DayType = {
	name: string
	selected: boolean
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
