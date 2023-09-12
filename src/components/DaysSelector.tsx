'use client'

import { useSelectedDays } from '@/components/SelectedDaysProvider'

function DaysSelector() {
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
		<div className='flex flex-col md:flex-row md:gap-6 mb-6 md:mb-12'>
			{days.map((day, index) => (
				<div key={index}>
					<label>
						<input
							type='checkbox'
							name={day.name}
							checked={day.selected}
							onChange={() => handleDayToggle(index)}
							className='mr-2'
						/>
						{day.name}
					</label>
				</div>
			))}
		</div>
	)
}

export default DaysSelector
