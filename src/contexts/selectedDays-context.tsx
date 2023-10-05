'use client'

import React from 'react'
import { DayType } from '@/types'

type SelectedDaysType = {
	days: DayType[]
	setDays: React.Dispatch<React.SetStateAction<DayType[]>>
	selectedDays: string[]
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

	// new array of strings with only the selected days as an array of strings: e.g. ['monday', 'thursday']
	const selectedDays = days
		.filter((day) => day.selected)
		.map(({ name }) => name)

	return (
		<SelectedDaysContext.Provider value={{ days, setDays, selectedDays }}>
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
