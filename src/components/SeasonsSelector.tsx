import Link from 'next/link'
import { Button } from './ui/button'

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
		<div className="flex gap-6 pb-4">
			<div className="flex flex-col">
				<h2>Plats</h2>
				<div className="flex gap-2">
					<Button
						variant="outline"
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
							Plats de saison
						</Link>
					</Button>
					<Button
						variant="outline"
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
							Tous les plats
						</Link>
					</Button>
				</div>
			</div>

			<div className="flex flex-col">
				<h2>Légumes</h2>
				<div className="flex gap-2">
					<Button
						variant="outline"
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
							Légumes de saison
						</Link>
					</Button>
					<Button
						variant="outline"
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
							Tous les légumes
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
