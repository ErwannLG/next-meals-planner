import { Carrot, Salad } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface MealItemProps {
	itemName: string
	itemType: string
}

export default function MealItem({ itemName, itemType }: MealItemProps) {
	return (
		<Card className='shadow-sm'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 text-slate-400'>
				<CardTitle className='text-sm font-medium'>{itemType}</CardTitle>
				{itemType === 'dish' ? <Salad /> : <Carrot />}
			</CardHeader>
			<CardContent className='text-lg font-bold text-slate-800 pt-1'>
				<p>{itemName}</p>
			</CardContent>
		</Card>
	)
}
