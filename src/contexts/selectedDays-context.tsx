'use client'

import React from 'react'

type SelectedDaysType = {
	days: string[]
	numberOfDays: number
	setNumberOfDays: React.Dispatch<React.SetStateAction<number>>
}

const SelectedDaysContext = React.createContext<SelectedDaysType | null>(null)

function SelectedDaysProvider({ children }: { children: React.ReactNode }) {
	const [numberOfDays, setNumberOfDays] = React.useState(5)

	// create an array of strings for the defined number of days (e.g. ['Jour 1', 'Jour 2', 'Jour 3' etc.])
	let days = []
	for (let id = 1; id <= numberOfDays; id++) {
		const day = `Jour ${id}`
		days.push(day)
	}

	return (
		<SelectedDaysContext.Provider
			value={{ numberOfDays, setNumberOfDays, days }}
		>
			{children}
		</SelectedDaysContext.Provider>
	)
}

export function useSelectedDays() {
	const context = React.useContext(SelectedDaysContext)

	if (context === undefined) {
		throw new Error(
			'useSelectedDays must be used within a SelectedDaysProvider'
		)
	}

	return context
}

export default SelectedDaysProvider
