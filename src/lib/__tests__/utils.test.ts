import {
	shuffleArray,
	getCurrentSeason,
	getRandomItemFromArray,
} from '../utils'

describe('shuffleArray', () => {
	it('should return an array of the same length', () => {
		const input = [1, 2, 3, 4, 5]
		const result = shuffleArray(input)
		expect(result).toHaveLength(input.length)
	})

	it('should contain all original elements', () => {
		const input = [1, 2, 3, 4, 5]
		const result = shuffleArray(input)
		expect(result.sort()).toEqual(input.sort())
	})

	it('should not mutate the original array', () => {
		const input = [1, 2, 3, 4, 5]
		const inputCopy = [...input]
		shuffleArray(input)
		expect(input).toEqual(inputCopy)
	})

	it('should work with empty arrays', () => {
		const input: number[] = []
		const result = shuffleArray(input)
		expect(result).toEqual([])
	})

	it('should work with single element arrays', () => {
		const input = [42]
		const result = shuffleArray(input)
		expect(result).toEqual([42])
	})

	it('should work with different types', () => {
		const input = ['a', 'b', 'c']
		const result = shuffleArray(input)
		expect(result).toHaveLength(3)
		expect(result.sort()).toEqual(['a', 'b', 'c'])
	})

	it('should shuffle the array (statistical test)', () => {
		const input = [1, 2, 3, 4, 5]
		let shuffled = false

		// Run multiple times to check if shuffling actually happens
		for (let i = 0; i < 10; i++) {
			const result = shuffleArray(input)
			if (JSON.stringify(result) !== JSON.stringify(input)) {
				shuffled = true
				break
			}
		}

		expect(shuffled).toBe(true)
	})
})

describe('getCurrentSeason', () => {
	it('should return "spring" for March', () => {
		// Mock Date to return March
		const mockDate = new Date('2024-03-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('spring')

		jest.restoreAllMocks()
	})

	it('should return "spring" for April', () => {
		const mockDate = new Date('2024-04-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('spring')

		jest.restoreAllMocks()
	})

	it('should return "spring" for May', () => {
		const mockDate = new Date('2024-05-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('spring')

		jest.restoreAllMocks()
	})

	it('should return "summer" for June', () => {
		const mockDate = new Date('2024-06-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('summer')

		jest.restoreAllMocks()
	})

	it('should return "summer" for July', () => {
		const mockDate = new Date('2024-07-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('summer')

		jest.restoreAllMocks()
	})

	it('should return "summer" for August', () => {
		const mockDate = new Date('2024-08-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('summer')

		jest.restoreAllMocks()
	})

	it('should return "fall" for September', () => {
		const mockDate = new Date('2024-09-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('fall')

		jest.restoreAllMocks()
	})

	it('should return "fall" for October', () => {
		const mockDate = new Date('2024-10-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('fall')

		jest.restoreAllMocks()
	})

	it('should return "fall" for November', () => {
		const mockDate = new Date('2024-11-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('fall')

		jest.restoreAllMocks()
	})

	it('should return "winter" for December', () => {
		const mockDate = new Date('2024-12-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('winter')

		jest.restoreAllMocks()
	})

	it('should return "winter" for January', () => {
		const mockDate = new Date('2024-01-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('winter')

		jest.restoreAllMocks()
	})

	it('should return "winter" for February', () => {
		const mockDate = new Date('2024-02-15')
		jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)

		expect(getCurrentSeason()).toBe('winter')

		jest.restoreAllMocks()
	})
})

describe('getRandomItemFromArray', () => {
	it('should return an item from the array', () => {
		const input = [1, 2, 3, 4, 5]
		const result = getRandomItemFromArray(input)
		expect(input).toContain(result)
	})

	it('should return the only item for single-element arrays', () => {
		const input = [42]
		const result = getRandomItemFromArray(input)
		expect(result).toBe(42)
	})

	it('should work with different types', () => {
		const input = ['a', 'b', 'c']
		const result = getRandomItemFromArray(input)
		expect(input).toContain(result)
	})

	it('should return different items over multiple calls (statistical test)', () => {
		const input = [1, 2, 3, 4, 5]
		const results = new Set<number>()

		// Call 20 times to get statistical variation
		for (let i = 0; i < 20; i++) {
			results.add(getRandomItemFromArray(input))
		}

		// Should have gotten at least 2 different values
		expect(results.size).toBeGreaterThan(1)
	})
})
