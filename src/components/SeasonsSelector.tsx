import Link from 'next/link'
import { Button } from './ui/button'
import { Label } from './ui/label'

interface SeasonsSelectorProps {
	dishesSeasons: 'current' | 'all' | string
	vegetablesSeasons: 'current' | 'all' | string
}

export default function SeasonsSelector({
	dishesSeasons,
	vegetablesSeasons,
}: SeasonsSelectorProps) {
	if (dishesSeasons !== 'current' && dishesSeasons !== 'all') {
		dishesSeasons = 'current'
	}
	if (vegetablesSeasons !== 'current' && vegetablesSeasons !== 'all') {
		vegetablesSeasons = 'current'
	}

	return (
		<div className="grid gap-4">
			<div className="space-y-2">
				<h4 className="font-medium leading-none">Options</h4>
				<p className="text-sm text-muted-foreground">
					Choisir si vous voulez des plats et légumes de saison et indiquer que
					le nombre de jours désirés.
				</p>
			</div>
			<div className="grid gap-2">
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="dishes_seasons">Plats</Label>
					<div
						className="grid min-w-max gap-2 min-[350px]:grid-cols-2"
						id="dishes_seasons"
					>
						<Button
							variant="outline"
							size="sm"
							className={`border-2 ${
								dishesSeasons === 'current'
									? 'border-green-600'
									: 'border-gray-200'
							}`}
							asChild
						>
							<Link
								href={`?${new URLSearchParams({
									dishesSeasons: 'current',
									vegetablesSeasons,
								}).toString()}`}
							>
								de saison
							</Link>
						</Button>
						<Button
							variant="outline"
							size="sm"
							className={`border-2 ${
								dishesSeasons === 'all' ? 'border-green-600' : 'border-gray-200'
							}`}
							asChild
						>
							<Link
								href={`?${new URLSearchParams({
									dishesSeasons: 'all',
									vegetablesSeasons,
								})}`}
							>
								tous
							</Link>
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="vegetables_seasons">Légumes</Label>
					<div
						className="grid min-w-max gap-2 min-[350px]:grid-cols-2"
						id="vegetables_seasons"
					>
						<Button
							variant="outline"
							size="sm"
							className={`border-2 ${
								vegetablesSeasons === 'current'
									? 'border-green-600'
									: 'border-gray-200'
							}`}
							asChild
						>
							<Link
								href={`?${new URLSearchParams({
									dishesSeasons,
									vegetablesSeasons: 'current',
								}).toString()}`}
							>
								de saison
							</Link>
						</Button>
						<Button
							variant="outline"
							size="sm"
							className={`border-2 ${
								vegetablesSeasons === 'all'
									? 'border-green-600'
									: 'border-gray-200'
							}`}
							asChild
						>
							<Link
								href={`?${new URLSearchParams({
									dishesSeasons,
									vegetablesSeasons: 'all',
								})}`}
							>
								tous
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
