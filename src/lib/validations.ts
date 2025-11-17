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

// Type inference from schemas
export type AddDishInput = z.infer<typeof addDishSchema>
export type SeasonQuery = z.infer<typeof seasonQuerySchema>
