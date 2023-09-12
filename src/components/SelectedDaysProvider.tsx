'use client'

import React from 'react'
import { Days } from '@/types'

type SelectedDaysType = {
	days: Days
	// setDays: () => void
	setDays: React.Dispatch<React.SetStateAction<Days>>

	// selectedDays: string[]
}

const defaultState = {
	days: [
		{
			name: 'lundi',
			selected: true,
		},
		{
			name: 'mardi',
			selected: true,
		},
		{
			name: 'mercredi',
			selected: true,
		},
		{
			name: 'jeudi',
			selected: true,
		},
		{
			name: 'vendredi',
			selected: true,
		},
		{
			name: 'samedi',
			selected: false,
		},
		{
			name: 'dimanche',
			selected: false,
		},
	],
}

const SelectedDaysContext = React.createContext<SelectedDaysType | null>(null)

function SelectedDaysProvider({ children }: { children: React.ReactNode }) {
	const [days, setDays] = React.useState(defaultState.days)

	// new array of strings with only the selected days
	// const selectedDays = days.filter((day) => day.selected).map(({ day }) => day)
	// console.log(selectedDays)

	return (
		<SelectedDaysContext.Provider value={{ days, setDays }}>
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
