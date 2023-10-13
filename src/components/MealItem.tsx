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
			<CardHeader className="bg-slate-100">
				<CardTitle className="flex w-full justify-between self-center rounded text-base font-medium text-slate-600">
					{itemType}{' '}
					<span>
						{itemType === 'dish' ? (
							<Salad className="text-slate-600/40" />
						) : (
							<Carrot className="text-slate-600/40" />
						)}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="text- flex h-24 justify-between font-bold text-slate-800">
				<div className="flex gap-2">
					<p className="self-center">{itemName}</p>
					<Button
						variant="ghost"
						size="icon"
						className="self-center"
						onClick={() => toggleLock(itemType, index)}
					>
						{locked ? (
							<Lock className="text-green-700/70" />
						) : (
							<Unlock className="text-green-700/30" />
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
