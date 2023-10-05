export type DishType = {
	id: number
	name: string
	type: string
	seasons: string[]
}

export type VegetableType = {
	id: number
	name: string
	seasons: string[]
}

export type DayType = {
	name: string
	selected: boolean
}

export type DaysType = DayType[]

export type MealType = {
	id: number
	dish: { name: string; locked: boolean }
	vegetable: { name: string; locked: boolean }
}
