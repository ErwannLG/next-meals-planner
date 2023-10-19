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
	return (
		<Card className="shadow-md">
			<CardHeader className="bg-muted">
				<CardTitle className="flex w-full justify-between self-center rounded text-base font-medium text-muted-foreground">
					{itemType}{' '}
					<span>
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
					<p className="line-clamp-2 self-center ">{itemName}</p>
					<Button
						variant="ghost"
						size="icon"
						className="self-center"
						onClick={() => toggleLock(itemType, index)}
					>
						{locked ? (
							<Lock className="text-green-700/70 dark:text-green-300/60" />
						) : (
							<Unlock className="text-green-700/30 dark:text-green-300/30" />
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
