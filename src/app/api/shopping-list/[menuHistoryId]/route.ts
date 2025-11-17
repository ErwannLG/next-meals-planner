import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { aggregateVegetables } from '@/lib/utils'

export async function GET(
	request: Request,
	{ params }: { params: { menuHistoryId: string } }
) {
	try {
		const { userId } = auth()

		if (!userId) {
			return NextResponse.json(
				{ error: 'Non authentifié' },
				{ status: 401 }
			)
		}

		const menuHistoryId = parseInt(params.menuHistoryId, 10)

		if (isNaN(menuHistoryId)) {
			return NextResponse.json(
				{ error: 'ID de menu invalide' },
				{ status: 400 }
			)
		}

		// Fetch the menu history
		const menuHistory = await prisma.menuHistory.findUnique({
			where: {
				id: menuHistoryId,
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
		})

		if (!menuHistory) {
			return NextResponse.json(
				{ error: 'Menu non trouvé' },
				{ status: 404 }
			)
		}

		// Verify the menu belongs to the authenticated user
		if (menuHistory.userId !== userId) {
			return NextResponse.json(
				{ error: 'Non autorisé' },
				{ status: 403 }
			)
		}

		// Aggregate vegetables into a shopping list
		const shoppingListItems = aggregateVegetables(menuHistory)

		return NextResponse.json({
			menuHistoryId: menuHistory.id,
			items: shoppingListItems,
			servings: 1, // Default servings
		})
	} catch (error) {
		console.error('Error generating shopping list:', error)
		return NextResponse.json(
			{ error: 'Erreur lors de la génération de la liste de courses' },
			{ status: 500 }
		)
	}
}
