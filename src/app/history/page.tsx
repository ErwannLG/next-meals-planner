import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import MenuHistoryList from '@/components/MenuHistoryList'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'

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
			<div className="mb-8">
				<Link href="/">
					<Button variant="ghost" className="mb-6 gap-2">
						<ArrowLeft size={20} />
						Retour au planning
					</Button>
				</Link>
				<div className="flex items-center gap-4 mb-4">
					<Logo size="sm" />
				</div>
				<div>
					<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
						Historique de mes menus
					</h1>
					<p className="text-muted-foreground">
						Consultez tous les menus que vous avez validés
					</p>
				</div>
			</div>
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
