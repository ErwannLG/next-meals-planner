import { authMiddleware } from '@clerk/nextjs'

// Protect all routes by default, but allow public access to:
// - Home page (/)
// - API routes for reading data (GET only)
// See https://clerk.com/docs/references/nextjs/auth-middleware
export default authMiddleware({
	publicRoutes: [
		'/',
		'/api/dishes',
		'/api/dishes/seasonal',
		'/api/vegetables',
		'/api/vegetables/seasonal',
	],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
