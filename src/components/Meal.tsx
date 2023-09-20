import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Salad, Carrot } from 'lucide-react'

export default function WeeklyMeals({ day, dish, vegetable }) {
	return (
		<div className='flex-1 space-y-4 px-4 py-6 border rounded-lg shadow'>
			<h2 className='text-2xl semi-bold tracking-tight uppercase text-slate-600 text-center'>
				{day}
			</h2>
			<Card className='shadow-sm'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 text-slate-400'>
					<CardTitle className='text-sm font-medium'>Plat</CardTitle>
					<Salad />
				</CardHeader>
				<CardContent className='text-lg font-bold text-slate-800 pt-1'>
					<p>{dish}</p>
				</CardContent>
			</Card>
			<Card className='shadow-sm'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 text-slate-400'>
					<CardTitle className='text-sm font-medium'>Légume</CardTitle>
					<Carrot />
				</CardHeader>
				<CardContent className='text-lg font-bold text-slate-800 pt-1'>
					<p>{vegetable}</p>
				</CardContent>
			</Card>
		</div>
	)
}
