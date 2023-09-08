export function getCurrentSeason() {
	const currentMonth = new Date().getMonth() + 1

	if (currentMonth >= 3 && currentMonth <= 5) {
		return 'spring'
	}
	if (currentMonth >= 6 && currentMonth <= 8) {
		return 'summer'
	}
	if (currentMonth >= 9 && currentMonth <= 11) {
		return 'fall'
	}
	if (currentMonth === 12 || currentMonth <= 2) {
		return 'winter'
	}
}

export function shuffleArray(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i)
		const temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
	return array
}
