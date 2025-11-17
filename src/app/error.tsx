'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('Application error:', error)
	}, [error])

	return (
		<div className="flex min-h-[95dvh] items-center justify-center">
			<div className="max-w-md space-y-4 text-center">
				<AlertCircle
					className="mx-auto h-16 w-16 text-destructive"
					aria-hidden="true"
				/>
				<h1 className="text-2xl font-bold">Une erreur est survenue</h1>
				<p className="text-muted-foreground">
					Désolé, nous n&apos;avons pas pu charger les suggestions de repas. Cela
					peut être dû à un problème de connexion ou à une erreur temporaire.
				</p>
				<Button onClick={() => reset()} className="mt-4">
					Réessayer
				</Button>
			</div>
		</div>
	)
}
