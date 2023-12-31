import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// const dishes = [
// 	{
// 		id: 1,
// 		name: 'Ratatouille',
// 		type: 'Vegetable Dish',
// 		seasons: ['summer'],
// 	},
// 	{
// 		id: 2,
// 		name: 'Légume grillés',
// 		type: 'Vegetable Dish',
// 		seasons: ['summer'],
// 	},
// 	{
// 		id: 3,
// 		name: 'Légumes farcis',
// 		type: 'Vegetable Dish',
// 		seasons: ['summer', 'fall'],
// 	},

// 	{ id: 4, name: 'Risotto', type: 'Rice Dish', seasons: ['spring', 'fall'] },
// 	{
// 		id: 5,
// 		name: 'Lasagnes',
// 		type: 'Pasta Dish',
// 		seasons: ['spring', 'summer', 'fall', 'winter'],
// 	},
// 	{
// 		id: 6,
// 		name: 'Soupe de légumes',
// 		type: 'Soup',
// 		seasons: ['spring', 'summer'],
// 	},
// 	{
// 		id: 7,
// 		name: 'Quiche Lorraine',
// 		type: 'Quiche',
// 		seasons: ['spring', 'summer', 'fall', 'winter'],
// 	},
// 	{
// 		id: 8,
// 		name: 'Croque-Monsieur',
// 		type: 'Sandwich',
// 		seasons: ['spring', 'summer', 'fall', 'winter'],
// 	},
// 	{
// 		id: 9,
// 		name: 'Pizza',
// 		type: 'Pizza',
// 		seasons: ['spring', 'summer', 'fall', 'winter'],
// 	},
// 	{
// 		id: 10,
// 		name: 'Vegetable Curry',
// 		type: 'Curry',
// 		seasons: ['spring', 'summer', 'fall', 'winter'],
// 	},
// ]

// export async function GET() {
// 	console.log(NextResponse.json(dishes))
// 	return NextResponse.json(dishes)
// }

export async function GET() {
	const dishes = await prisma.dish.findMany({
		include: {
			seasons: true,
		},
	})
	console.log(dishes)

	return NextResponse.json(dishes)
}
