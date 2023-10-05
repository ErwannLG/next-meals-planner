'use client'

import { Carrot, Salad, Lock, Unlock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useState } from 'react'

interface MealItemProps {
	itemName: string
	itemType: string
	locked: boolean
}

export default function MealItem({
	itemName,
	itemType,
	locked,
}: MealItemProps) {
	const [isHovering, setIsHovering] = useState(false)

	const handleMouseEnter = () => setIsHovering(true)
	const handleMouseLeave = () => setIsHovering(false)

	return (
		<Card className='shadow-sm'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4 text-slate-400'>
				<CardTitle className='text-sm font-medium'>{itemType}</CardTitle>
				{itemType === 'dish' ? <Salad /> : <Carrot />}
			</CardHeader>
			<CardContent className='flex justify-between text-lg font-bold text-slate-800 pt-1'>
				<div className='flex gap-2'>
					<p className='self-center'>{itemName}</p>
					<Button
						onMouseLeave={handleMouseLeave}
						onMouseEnter={handleMouseEnter}
						variant='ghost'
						size='icon'
						className=''
					>
						{locked ? (
							isHovering ? (
								<Lock className='text-green-700/40' />
							) : (
								<Unlock className='text-green-700/40' />
							)
						) : isHovering ? (
							<Unlock className='text-green-700/40' />
						) : (
							<Lock className='text-green-700/40' />
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
