import { z } from 'zod'

// Validation schema for adding a dish
export const addDishSchema = z.object({
	name: z
		.string()
		.min(2, 'Le nom doit contenir au moins 2 caractères')
		.max(100, 'Le nom ne doit pas dépasser 100 caractères')
		.trim(),
	seasonIds: z
		.array(z.number().int().positive())
		.min(1, 'Veuillez sélectionner au moins une saison'),
})

// Validation schema for query parameters
export const seasonQuerySchema = z.object({
	dishesSeasons: z.enum(['current', 'all']).optional().default('current'),
	vegetablesSeasons: z.enum(['current', 'all']).optional().default('current'),
})

// Validation schema for saving a validated menu
export const saveMenuSchema = z.object({
	numberOfDays: z.number().int().min(1).max(7),
	items: z.array(
		z.object({
			dayNumber: z.number().int().min(1).max(7),
			dishId: z.number().int().positive(),
			vegetableId: z.number().int().positive(),
		})
	).min(1, 'Le menu doit contenir au moins un jour'),
})

// Type inference from schemas
export type AddDishInput = z.infer<typeof addDishSchema>
export type SeasonQuery = z.infer<typeof seasonQuerySchema>
export type SaveMenuInput = z.infer<typeof saveMenuSchema>
