'use client'

import { Carrot, Salad, Lock, Unlock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface MealItemProps {
	index: number
	itemName: string
	itemType: 'dish' | 'vegetable'
	locked: boolean
	toggleLock: (itemType: 'dish' | 'vegetable', index: number) => void
}

export default function MealItem({
	index,
	itemName,
	itemType,
	locked,
	toggleLock,
}: MealItemProps) {
	const itemTypeLabel = itemType === 'dish' ? 'Plat' : 'Légume'
	const lockButtonLabel = locked
		? `Déverrouiller ${itemTypeLabel.toLowerCase()}`
		: `Verrouiller ${itemTypeLabel.toLowerCase()}`

	return (
		<Card className="shadow-md transition-all duration-200 hover:shadow-lg">
			<CardHeader className="bg-muted">
				<CardTitle className="flex w-full justify-between self-center rounded text-base font-medium text-muted-foreground">
					<span id={`${itemType}-${index}-type`}>{itemTypeLabel}</span>
					<span aria-hidden="true">
						{itemType === 'dish' ? (
							<Salad
								strokeWidth={1.75}
								className="text-muted-foreground dark:text-muted-foreground/70"
							/>
						) : (
							<Carrot
								strokeWidth={1.75}
								className="text-muted-foreground dark:text-muted-foreground/70"
							/>
						)}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex h-24 justify-between bg-card font-bold text-foreground">
				<div className="flex gap-2 overflow-hidden text-ellipsis">
					<p
						className="line-clamp-2 self-center"
						id={`${itemType}-${index}-name`}
						aria-label={`${itemTypeLabel}: ${itemName}`}
					>
						{itemName}
					</p>
					<Button
						variant="ghost"
						size="icon"
						className="self-center"
						onClick={() => toggleLock(itemType, index)}
						aria-label={lockButtonLabel}
						aria-pressed={locked}
						aria-describedby={`${itemType}-${index}-name`}
						title={lockButtonLabel}
					>
						{locked ? (
							<Lock
								className="text-green-700/70 dark:text-green-300/60"
								aria-hidden="true"
							/>
						) : (
							<Unlock
								className="text-green-700/30 dark:text-green-300/30"
								aria-hidden="true"
							/>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
