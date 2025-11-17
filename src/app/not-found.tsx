import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
	return (
		<div className="flex min-h-[95dvh] items-center justify-center">
			<div className="max-w-md space-y-4 text-center">
				<h1 className="text-6xl font-bold text-muted-foreground">404</h1>
				<h2 className="text-2xl font-bold">Page non trouvée</h2>
				<p className="text-muted-foreground">
					Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
				</p>
				<Button asChild className="mt-4">
					<Link href="/" className="gap-2">
						<Home size={20} aria-hidden="true" />
						Retour à l'accueil
					</Link>
				</Button>
			</div>
		</div>
	)
}
