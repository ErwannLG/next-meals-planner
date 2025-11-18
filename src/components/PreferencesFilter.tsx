'use client'

import { Label } from './ui/label'
import { Switch } from './ui/switch'

interface PreferencesFilterProps {
	excludeDisliked: boolean
	onExcludeDislikedChange: (checked: boolean) => void
}

export default function PreferencesFilter({
	excludeDisliked,
	onExcludeDislikedChange,
}: PreferencesFilterProps) {
	return (
		<div className="space-y-2">
			<h4 className="font-medium leading-none">Préférences</h4>
			<div className="flex items-center justify-between space-x-2">
				<Label htmlFor="exclude-disliked" className="text-sm font-normal">
					Exclure les plats/légumes non aimés
				</Label>
				<Switch
					id="exclude-disliked"
					checked={excludeDisliked}
					onCheckedChange={onExcludeDislikedChange}
				/>
			</div>
		</div>
	)
}
