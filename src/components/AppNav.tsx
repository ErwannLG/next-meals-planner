import AddMenu from './AddMenu'
import AuthCheck from './AuthCheck'
import { ModeToggle } from './ModeToggle'
import Options from './Options'
import { SignInButton, SignOutButton } from './logButtons'

interface SeasonsSelectorProps {
	dishesSeasons: 'current' | 'all' | string
	vegetablesSeasons: 'current' | 'all' | string
}

export default function AppNav({
	dishesSeasons,
	vegetablesSeasons,
}: SeasonsSelectorProps) {
	return (
		<nav className="flex justify-end gap-2">
			<AuthCheck>
				<AddMenu />
			</AuthCheck>
			<ModeToggle />
			<Options
				dishesSeasons={dishesSeasons}
				vegetablesSeasons={vegetablesSeasons}
			/>

			<SignInButton />

			<AuthCheck>
				<SignOutButton />
			</AuthCheck>
		</nav>
	)
}
