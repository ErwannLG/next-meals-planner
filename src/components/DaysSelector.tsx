'use client'

import { useSelectedDays } from '@/contexts/selectedDays-context'
import { Label } from './ui/label'
import { Input } from './ui/input'
import React from 'react'

export default function DaysSelector() {
	const daysContext = useSelectedDays()

	if (!daysContext) {
		return null
	}

	const { numberOfDays, setNumberOfDays } = daysContext

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newNumberOfDays = Number(event.target.value)
		setNumberOfDays(newNumberOfDays)
	}

	return (
		<div className="grid grid-cols-3 items-center gap-4">
			<Label htmlFor="days-selector">
				Nombre de jours <span className="text-muted-foreground">(1-7)</span>
			</Label>
			<div className="mb-2 flex flex-col" id="days-selector">
				<Input
					name="numberOfDaysInput"
					type="number"
					min="1"
					max="7"
					defaultValue={numberOfDays}
					onChange={handleChange}
				/>
			</div>
		</div>
	)
}
