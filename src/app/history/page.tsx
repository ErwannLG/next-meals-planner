import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import MenuHistoryList from '@/components/MenuHistoryList'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default async function HistoryPage() {
	const user = await currentUser()

	if (!user) {
		redirect('/')
	}

	const menuHistory = await prisma.menuHistory.findMany({
		where: {
			userId: user.id,
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

	return (
		<main className="container mx-auto px-4 py-8">
			<Link href="/">
				<Button variant="ghost" className="mb-4 gap-2">
					<ArrowLeft size={20} />
					Retour au planning
				</Button>
			</Link>
			<h1 className="mb-8 text-3xl font-bold">Historique de mes menus</h1>
			{menuHistory.length === 0 ? (
				<p className="text-muted-foreground">
					Vous n&apos;avez pas encore validé de menu.
				</p>
			) : (
				<MenuHistoryList menuHistory={menuHistory} />
			)}
		</main>
	)
}
