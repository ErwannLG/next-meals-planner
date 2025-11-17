import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { addDishSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'
import AddDishForm from '@/components/AddDishForm'

type FormState = {
	errors?: {
		name?: string[]
		seasonIds?: string[]
		_form?: string[]
	}
	success?: boolean
}

export default async function AddDish() {
	const addDish = async (
		prevState: FormState,
		formData: FormData
	): Promise<FormState> => {
		'use server'

		try {
			const seasons = formData.getAll('season')
			const seasonIds = seasons.map((season) => parseInt(season as string))

			// Validate input with Zod
			const validatedData = addDishSchema.parse({
				name: formData.get('name'),
				seasonIds,
			})

			await prisma.dish.create({
				data: {
					name: validatedData.name,
					seasons: {
						connect: validatedData.seasonIds.map((id) => ({ id })),
					},
				},
			})

			revalidatePath('/dishes/add')
			redirect('/')
		} catch (error: unknown) {
			// Handle Zod validation errors
			if (error && typeof error === 'object' && 'issues' in error) {
				const zodError = error as {
					issues: Array<{ path: (string | number)[]; message: string }>
				}
				const errors: {
					name?: string[]
					seasonIds?: string[]
					_form?: string[]
				} = {}

				zodError.issues.forEach((issue) => {
					const field = issue.path[0]
					if (field === 'name' || field === 'seasonIds' || field === '_form') {
						if (!errors[field]) {
							errors[field] = []
						}
						errors[field]!.push(issue.message)
					}
				})

				return { errors }
			}

			// Handle other errors
			return {
				errors: {
					_form: [
						'Une erreur est survenue lors de l\'ajout du plat. Veuillez réessayer.',
					],
				},
			}
		}
	}

	return <AddDishForm action={addDish} />
}
