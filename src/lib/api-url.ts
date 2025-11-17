/**
 * Get the base URL for API calls
 * Works in both development and production environments
 */
export function getBaseUrl() {
	// Browser environment
	if (typeof window !== 'undefined') {
		return ''
	}

	// Vercel deployment
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}

	// Custom deployment URL
	if (process.env.NEXT_PUBLIC_APP_URL) {
		return process.env.NEXT_PUBLIC_APP_URL
	}

	// Fallback to localhost
	return 'http://localhost:3000'
}
