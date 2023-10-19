import Link from 'next/link'
import { Button } from './ui/button'
import { Label } from './ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Settings } from 'lucide-react'
import DaysSelector from '@/components/DaysSelector'
import SeasonsSelector from './SeasonsSelector'

interface SeasonsSelectorProps {
	dishesSeasons: 'current' | 'all' | string
	vegetablesSeasons: 'current' | 'all' | string
}

export default function Options({
	dishesSeasons,
	vegetablesSeasons,
}: SeasonsSelectorProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<Settings className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<SeasonsSelector
						dishesSeasons={dishesSeasons}
						vegetablesSeasons={vegetablesSeasons}
					/>
					<DaysSelector />
				</div>
			</PopoverContent>
		</Popover>
	)
}
