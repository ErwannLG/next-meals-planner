import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const dishes = await prisma.dish.findMany({
			include: {
				seasons: true,
			},
		})

		return NextResponse.json(dishes)
	} catch (error) {
		console.error('Error fetching dishes from database:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch dishes' },
			{ status: 500 }
		)
	}
}
