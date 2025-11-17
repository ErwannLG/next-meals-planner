'use client'

import { useState } from 'react'
import { MenuHistoryType } from '@/types'
import { Button } from './ui/button'
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react'
import ShoppingList from './ShoppingList'

interface Props {
	menuHistory: MenuHistoryType[]
}

export default function MenuHistoryList({ menuHistory }: Props) {
	const [expandedMenus, setExpandedMenus] = useState<Set<number>>(new Set())
	const [shoppingListMenus, setShoppingListMenus] = useState<Set<number>>(new Set())

	const toggleMenu = (menuId: number) => {
		setExpandedMenus((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(menuId)) {
				newSet.delete(menuId)
			} else {
				newSet.add(menuId)
			}
			return newSet
		})
	}

	const toggleShoppingList = (menuId: number) => {
		setShoppingListMenus((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(menuId)) {
				newSet.delete(menuId)
			} else {
				newSet.add(menuId)
			}
			return newSet
		})
	}

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('fr-FR', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	return (
		<div className="space-y-4">
			{menuHistory.map((menu) => {
				const isExpanded = expandedMenus.has(menu.id)
				const showShoppingList = shoppingListMenus.has(menu.id)

				return (
					<div
						key={menu.id}
						className="rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30"
					>
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-lg font-semibold">
									Menu de {menu.numberOfDays} jour{menu.numberOfDays > 1 ? 's' : ''}
								</h2>
								<p className="text-sm text-muted-foreground">
									Validé le {formatDate(menu.validatedAt)}
								</p>
							</div>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => toggleShoppingList(menu.id)}
									aria-label={showShoppingList ? 'Masquer la liste de courses' : 'Afficher la liste de courses'}
								>
									<ShoppingCart size={16} className="mr-1" />
									{showShoppingList ? 'Masquer' : 'Liste'}
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => toggleMenu(menu.id)}
									aria-label={isExpanded ? 'Masquer les détails' : 'Afficher les détails'}
								>
									{isExpanded ? (
										<ChevronUp size={20} />
									) : (
										<ChevronDown size={20} />
									)}
								</Button>
							</div>
						</div>

						{isExpanded && (
							<div className="mt-4 space-y-3 border-t pt-4">
								{menu.items.map((item) => (
									<div
										key={item.id}
										className="flex items-center justify-between rounded-md bg-muted/50 p-3 transition-all duration-200 hover:bg-muted/70"
									>
										<span className="font-medium">Jour {item.dayNumber}</span>
										<div className="flex flex-col items-end gap-1 text-sm">
											<span>
												<span className="font-medium">Plat :</span> {item.dish.name}
											</span>
											<span>
												<span className="font-medium">Légume :</span> {item.vegetable.name}
											</span>
										</div>
									</div>
								))}
							</div>
						)}

						{showShoppingList && (
							<div className="mt-4 border-t pt-4">
								<ShoppingList menuHistoryId={menu.id} />
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}
