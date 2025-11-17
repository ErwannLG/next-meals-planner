import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { saveMenuSchema } from '@/lib/validations'

export async function GET() {
	try {
		const { userId } = auth()

		if (!userId) {
			return NextResponse.json(
				{ error: 'Non authentifié' },
				{ status: 401 }
			)
		}

		const menuHistory = await prisma.menuHistory.findMany({
			where: {
				userId,
			},
			include: {
				items: {
					include: {
						dish: true,
						vegetable: true,
					},
					orderBy: {
						dayNumber: 'asc',
					},
				},
			},
			orderBy: {
				validatedAt: 'desc',
			},
		})

		return NextResponse.json(menuHistory)
	} catch (error) {
		console.error('Error fetching menu history:', error)
		return NextResponse.json(
			{ error: 'Erreur lors de la récupération de l\'historique' },
			{ status: 500 }
		)
	}
}

export async function POST(request: Request) {
	try {
		const { userId } = auth()

		if (!userId) {
			return NextResponse.json(
				{ error: 'Non authentifié' },
				{ status: 401 }
			)
		}

		const body = await request.json()
		const validatedData = saveMenuSchema.parse(body)

		const menuHistory = await prisma.menuHistory.create({
			data: {
				userId,
				numberOfDays: validatedData.numberOfDays,
				items: {
					create: validatedData.items.map((item: { dayNumber: number; dishId: number; vegetableId: number }) => ({
						dayNumber: item.dayNumber,
						dishId: item.dishId,
						vegetableId: item.vegetableId,
					})),
				},
			},
			include: {
				items: {
					include: {
						dish: true,
						vegetable: true,
					},
				},
			},
		})

		return NextResponse.json(menuHistory, { status: 201 })
	} catch (error) {
		console.error('Error saving menu:', error)

		if (error instanceof Error && error.name === 'ZodError') {
			return NextResponse.json(
				{ error: 'Données invalides' },
				{ status: 400 }
			)
		}

		return NextResponse.json(
			{ error: 'Erreur lors de la sauvegarde du menu' },
			{ status: 500 }
		)
	}
}
