export const NAME_LONG = 'AI-Powered Fullstack Components'
export const NAME_SHORT = 'Fullstack Components'
export const NAME_LIB = '@fullstack-components'
export const URL_GITHUB = 'https://github.com/ambient-co/fullstack-components'

// Use process.env.PORT by default and fallback to port 3000
export const PORT = process.env.PORT || 3000
export const URL_BASE = `http://localhost:${PORT}`

export const DEPLOYMENT_URL =
	process.env.VERCEL_ENV === 'preview'
		? `https://${process.env.VERCEL_URL}`
		: process.env.NEXT_PUBLIC_HOST
