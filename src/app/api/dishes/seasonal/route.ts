import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getCurrentSeason } from '@/lib/utils'

export async function GET() {
	try {
		const currentSeason = getCurrentSeason()

		if (!currentSeason) {
			return NextResponse.json(
				{ error: 'Could not determine current season' },
				{ status: 400 }
			)
		}

		const dishes = await prisma.dish.findMany({
			include: {
				seasons: true,
			},
			where: {
				seasons: {
					some: {
						name: currentSeason,
					},
				},
			},
		})

		return NextResponse.json(dishes)
	} catch (error) {
		console.error('Error fetching seasonal dishes from database:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch seasonal dishes' },
			{ status: 500 }
		)
	}
}
