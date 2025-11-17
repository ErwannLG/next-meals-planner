import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PreferencesManager from '@/components/PreferencesManager'

export default async function PreferencesPage() {
	const user = await currentUser()

	if (!user) {
		redirect('/')
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-3xl font-bold">Mes Préférences</h1>
				<Link href="/">
					<Button variant="outline" className="gap-2">
						<ArrowLeft size={20} />
						Retour
					</Button>
				</Link>
			</div>

			<PreferencesManager />
		</main>
	)
}
