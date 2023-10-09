import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getCurrentSeason } from '@/lib/utils'

export async function GET() {
	const currentSeason = getCurrentSeason()

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
	console.log(dishes)

	return NextResponse.json(dishes)
}
