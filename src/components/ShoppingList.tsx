'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ShoppingListType } from '@/types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
	Printer,
	Download,
	Share2,
	Loader2,
	ShoppingCart,
	Minus,
	Plus,
} from 'lucide-react'
import { formatShoppingListForPrint } from '@/lib/utils'

interface Props {
	menuHistoryId: number
}

export default function ShoppingList({ menuHistoryId }: Props) {
	const [shoppingList, setShoppingList] = useState<ShoppingListType | null>(null)
	const [servings, setServings] = useState(1)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [shareStatus, setShareStatus] = useState<string | null>(null)
	const printRef = useRef<HTMLDivElement>(null)

	const fetchShoppingList = useCallback(async () => {
		try {
			setIsLoading(true)
			setError(null)

			const response = await fetch(`/api/shopping-list/${menuHistoryId}`)

			if (!response.ok) {
				throw new Error('Erreur lors du chargement de la liste de courses')
			}

			const data = await response.json()
			setShoppingList(data)
			setServings(data.servings)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Une erreur est survenue')
		} finally {
			setIsLoading(false)
		}
	}, [menuHistoryId])

	useEffect(() => {
		fetchShoppingList()
	}, [fetchShoppingList])

	const handlePrint = () => {
		if (!shoppingList) return

		const printContent = formatShoppingListForPrint(shoppingList.items, servings)
		const printWindow = window.open('', '_blank')

		if (printWindow) {
			printWindow.document.write(`
				<!DOCTYPE html>
				<html>
					<head>
						<title>Liste de courses</title>
						<style>
							body {
								font-family: Arial, sans-serif;
								padding: 20px;
								line-height: 1.6;
							}
							pre {
								white-space: pre-wrap;
								font-family: Arial, sans-serif;
								font-size: 14px;
							}
							@media print {
								body {
									padding: 0;
								}
							}
						</style>
					</head>
					<body>
						<pre>${printContent}</pre>
					</body>
				</html>
			`)
			printWindow.document.close()
			printWindow.print()
		}
	}

	const handleDownload = () => {
		if (!shoppingList) return

		const content = formatShoppingListForPrint(shoppingList.items, servings)
		const blob = new Blob([content], { type: 'text/plain' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = `liste-de-courses-${new Date().toISOString().split('T')[0]}.txt`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	const handleShare = async () => {
		if (!shoppingList) return

		const content = formatShoppingListForPrint(shoppingList.items, servings)

		// Check if Web Share API is available
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Liste de courses',
					text: content,
				})
				setShareStatus('Partagé avec succès!')
				setTimeout(() => setShareStatus(null), 3000)
			} catch (err) {
				if ((err as Error).name !== 'AbortError') {
					fallbackShare(content)
				}
			}
		} else {
			fallbackShare(content)
		}
	}

	const fallbackShare = (content: string) => {
		// Fallback: copy to clipboard
		navigator.clipboard.writeText(content).then(
			() => {
				setShareStatus('Copié dans le presse-papiers!')
				setTimeout(() => setShareStatus(null), 3000)
			},
			() => {
				setShareStatus('Erreur lors de la copie')
				setTimeout(() => setShareStatus(null), 3000)
			}
		)
	}

	const adjustServings = (delta: number) => {
		setServings((prev) => Math.max(1, prev + delta))
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="rounded-lg border border-destructive bg-destructive/10 p-4">
				<p className="text-sm text-destructive">{error}</p>
			</div>
		)
	}

	if (!shoppingList || shoppingList.items.length === 0) {
		return (
			<div className="rounded-lg border bg-card p-4">
				<p className="text-sm text-muted-foreground">
					Aucun légume dans ce menu.
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			<div className="rounded-lg border bg-card p-6 shadow-sm">
				<div className="mb-4 flex items-center gap-2">
					<ShoppingCart className="h-5 w-5 text-primary" />
					<h2 className="text-xl font-semibold">Liste de courses</h2>
				</div>

				{/* Servings Adjuster */}
				<div className="mb-6 flex items-center gap-4 rounded-md bg-muted/50 p-4">
					<Label htmlFor="servings" className="text-sm font-medium">
						Nombre de personnes :
					</Label>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => adjustServings(-1)}
							disabled={servings <= 1}
							aria-label="Diminuer le nombre de personnes"
						>
							<Minus className="h-4 w-4" />
						</Button>
						<Input
							id="servings"
							type="number"
							min="1"
							value={servings}
							onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
							className="w-16 text-center"
						/>
						<Button
							variant="outline"
							size="sm"
							onClick={() => adjustServings(1)}
							aria-label="Augmenter le nombre de personnes"
						>
							<Plus className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Shopping List Items */}
				<div ref={printRef} className="space-y-2">
					{shoppingList.items.map((item) => {
						const quantity = item.count * servings
						return (
							<div
								key={item.vegetableId}
								className="flex items-center justify-between rounded-md border bg-background p-3"
							>
								<span className="font-medium">{item.vegetableName}</span>
								<span className="text-sm text-muted-foreground">
									x{quantity}
								</span>
							</div>
						)
					})}
				</div>

				{/* Action Buttons */}
				<div className="mt-6 flex flex-wrap gap-2">
					<Button onClick={handlePrint} variant="default">
						<Printer className="mr-2 h-4 w-4" />
						Imprimer
					</Button>
					<Button onClick={handleDownload} variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Télécharger
					</Button>
					<Button onClick={handleShare} variant="outline">
						<Share2 className="mr-2 h-4 w-4" />
						Partager
					</Button>
				</div>

				{shareStatus && (
					<div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
						{shareStatus}
					</div>
				)}
			</div>
		</div>
	)
}
