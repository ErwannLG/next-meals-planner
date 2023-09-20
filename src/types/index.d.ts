export type Dish = {
	id: number
	name: string
	type: string
	seasons: string[]
}

export type Vegetable = {
	id: number
	name: string
	seasons: string[]
}

export type Day = {
	name: string
	selected: boolean
}

export type Days = Day[]

export type Meal = {
	id: number
	Dish
	Vegetable
}
