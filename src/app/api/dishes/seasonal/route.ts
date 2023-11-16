const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getCurrentSeason } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET() {
	const currentSeason = getCurrentSeason()

	const session = await getServerSession(authOptions)

	if (!session) {
		const dishes = await prisma.dish.findMany({
			where: {
				seasons: {
					some: {
						name: currentSeason,
					},
				},
			},
		})
	}

	const dishes = await prisma.dish.findMany({
		where: {
			AND: {
				seasons: {
					some: {
						name: currentSeason,
					},
				},
				OR: [
					{ userId: session.user?.id },
					{ userId: 'clnyd3vcw0000elng2p19k1rr' },
				],
			},
		},
	})
	console.log(dishes)

	return NextResponse.json(dishes)
}
