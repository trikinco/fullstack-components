export const NAME_LONG = 'AI-Powered Fullstack Components'
export const NAME_SHORT = 'Fullstack Components'
export const URL_GITHUB = 'https://github.com/ambient-co/fullstack-components'

export const DEPLOYMENT_URL =
	process.env.VERCEL_ENV === 'preview'
		? `https://${process.env.VERCEL_URL}`
		: process.env.NEXT_PUBLIC_HOST
