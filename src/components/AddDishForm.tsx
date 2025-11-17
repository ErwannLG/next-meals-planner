'use client'

import { useState, useTransition } from 'react'
import { Button } from './ui/button'

type FormState = {
	errors?: {
		name?: string[]
		seasonIds?: string[]
		_form?: string[]
	}
	success?: boolean
}

type AddDishFormProps = {
	action: (prevState: FormState, formData: FormData) => Promise<FormState>
}

export default function AddDishForm({ action }: AddDishFormProps) {
	const [formState, setFormState] = useState<FormState>({})
	const [isPending, startTransition] = useTransition()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)

		startTransition(async () => {
			const result = await action(formState, formData)
			setFormState(result)
		})
	}

	return (
		<div className="max-w-md">
			<h1 className="mb-4 text-2xl font-bold">Ajouter un plat</h1>

			{formState.errors?._form && (
				<div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-300">
					{formState.errors._form.join(', ')}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="mb-1 block font-medium">
						Nom du plat
					</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
						aria-describedby={
							formState.errors?.name ? 'name-error' : undefined
						}
					/>
					{formState.errors?.name && (
						<p id="name-error" className="mt-1 text-sm text-red-600">
							{formState.errors.name.join(', ')}
						</p>
					)}
				</div>

				<fieldset>
					<legend className="mb-2 font-medium">Saisons</legend>
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="season"
								id="spring"
								value={2}
								className="h-4 w-4 rounded border-input"
							/>
							<label htmlFor="spring">Printemps</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="season"
								id="summer"
								value={3}
								className="h-4 w-4 rounded border-input"
							/>
							<label htmlFor="summer">Été</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="season"
								id="fall"
								value={4}
								className="h-4 w-4 rounded border-input"
							/>
							<label htmlFor="fall">Automne</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="season"
								id="winter"
								value={1}
								className="h-4 w-4 rounded border-input"
							/>
							<label htmlFor="winter">Hiver</label>
						</div>
					</div>
					{formState.errors?.seasonIds && (
						<p className="mt-1 text-sm text-red-600">
							{formState.errors.seasonIds.join(', ')}
						</p>
					)}
				</fieldset>

				<Button type="submit" disabled={isPending} className="mt-4">
					{isPending ? 'Enregistrement...' : 'Enregistrer un plat'}
				</Button>
			</form>
		</div>
	)
}
