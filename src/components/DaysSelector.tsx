'use client'

import { useSelectedDays } from '@/contexts/selectedDays-context'
import { DayType } from '@/types'

export default function DaysSelector() {
	const daysContext = useSelectedDays()

	if (!daysContext) {
		return null
	}

	const { days, setDays } = daysContext

	function handleDayToggle(index: number) {
		const newDays = [...days]
		newDays[index].selected = !newDays[index].selected
		setDays(newDays)
	}

	return (
		<div className="mb-2 flex flex-col md:flex-row md:gap-6">
			{days.map((day: DayType, index: number) => (
				<div key={index}>
					<label>
						<input
							type="checkbox"
							name={day.name}
							checked={day.selected}
							onChange={() => handleDayToggle(index)}
							className="mr-2"
						/>
						{day.name}
					</label>
				</div>
			))}
		</div>
	)
}
