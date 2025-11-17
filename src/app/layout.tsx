import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import SelectedDaysProvider from '@/contexts/selectedDays-context'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Next Meals Planner - Planificateur de repas',
	description:
		'Planifiez vos repas de la semaine avec des suggestions de plats et légumes de saison',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="fr">
				<body
					className={`${inter.className} bg-background p-4 text-foreground`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SelectedDaysProvider>{children}</SelectedDaysProvider>
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
