import { RefreshCw } from 'lucide-react'

export default function Loading() {
	return (
		<div className="flex min-h-[95dvh] items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<RefreshCw
					className="h-12 w-12 animate-spin text-primary"
					aria-hidden="true"
				/>
				<p className="text-lg font-medium text-muted-foreground">
					Chargement des suggestions de repas...
				</p>
			</div>
		</div>
	)
}
