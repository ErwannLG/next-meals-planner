'use client'

import { Carrot, Salad, Lock, Unlock, Heart, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface MealItemProps {
	index: number
	itemId: number
	itemName: string
	itemType: 'dish' | 'vegetable'
	locked: boolean
	preference?: 'FAVORITE' | 'DISLIKED' | null
	toggleLock: (itemType: 'dish' | 'vegetable', index: number) => void
	onPreferenceChange?: (itemType: 'dish' | 'vegetable', itemId: number, preference: 'FAVORITE' | 'DISLIKED' | null) => void
}

export default function MealItem({
	index,
	itemId,
	itemName,
	itemType,
	locked,
	preference,
	toggleLock,
	onPreferenceChange,
}: MealItemProps) {
	const itemTypeLabel = itemType === 'dish' ? 'Plat' : 'Légume'
	const lockButtonLabel = locked
		? `Déverrouiller ${itemTypeLabel.toLowerCase()}`
		: `Verrouiller ${itemTypeLabel.toLowerCase()}`

	const handleFavoriteClick = () => {
		if (!onPreferenceChange) return
		const newPreference = preference === 'FAVORITE' ? null : 'FAVORITE'
		onPreferenceChange(itemType, itemId, newPreference)
	}

	const handleDislikeClick = () => {
		if (!onPreferenceChange) return
		const newPreference = preference === 'DISLIKED' ? null : 'DISLIKED'
		onPreferenceChange(itemType, itemId, newPreference)
	}

	return (
		<Card className="shadow-md transition-all duration-200 hover:shadow-lg">
			<CardHeader className="bg-muted">
				<CardTitle className="flex w-full justify-between self-center rounded text-base font-medium text-muted-foreground">
					<span id={`${itemType}-${index}-type`}>{itemTypeLabel}</span>
					<span aria-hidden="true">
						{itemType === 'dish' ? (
							<Salad
								strokeWidth={1.75}
								className="text-muted-foreground dark:text-muted-foreground/70"
							/>
						) : (
							<Carrot
								strokeWidth={1.75}
								className="text-muted-foreground dark:text-muted-foreground/70"
							/>
						)}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex h-24 justify-between bg-card font-bold text-foreground">
				<div className="flex gap-2 overflow-hidden text-ellipsis">
					<p
						className="line-clamp-2 self-center"
						id={`${itemType}-${index}-name`}
						aria-label={`${itemTypeLabel}: ${itemName}`}
					>
						{itemName}
					</p>
					<div className="flex self-center gap-1">
						{onPreferenceChange && (
							<>
								<Button
									variant="ghost"
									size="icon"
									className="self-center h-8 w-8"
									onClick={handleFavoriteClick}
									aria-label={preference === 'FAVORITE' ? 'Retirer des favoris' : 'Ajouter aux favoris'}
									aria-pressed={preference === 'FAVORITE'}
									title={preference === 'FAVORITE' ? 'Retirer des favoris' : 'Ajouter aux favoris'}
								>
									<Heart
										className={preference === 'FAVORITE'
											? 'text-red-500 fill-red-500'
											: 'text-muted-foreground/40'
										}
										size={18}
										aria-hidden="true"
									/>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="self-center h-8 w-8"
									onClick={handleDislikeClick}
									aria-label={preference === 'DISLIKED' ? 'Retirer des non aimés' : 'Marquer comme non aimé'}
									aria-pressed={preference === 'DISLIKED'}
									title={preference === 'DISLIKED' ? 'Retirer des non aimés' : 'Marquer comme non aimé'}
								>
									<X
										className={preference === 'DISLIKED'
											? 'text-gray-600 dark:text-gray-400 stroke-[3]'
											: 'text-muted-foreground/40'
										}
										size={18}
										aria-hidden="true"
									/>
								</Button>
							</>
						)}
						<Button
							variant="ghost"
							size="icon"
							className="self-center h-8 w-8"
							onClick={() => toggleLock(itemType, index)}
							aria-label={lockButtonLabel}
							aria-pressed={locked}
							aria-describedby={`${itemType}-${index}-name`}
							title={lockButtonLabel}
						>
							{locked ? (
								<Lock
									className="text-green-700/70 dark:text-green-300/60"
									size={18}
									aria-hidden="true"
								/>
							) : (
								<Unlock
									className="text-green-700/30 dark:text-green-300/30"
									size={18}
									aria-hidden="true"
								/>
							)}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
