// Utils
export const IS_DEV = process.env.NODE_ENV === 'development'

// Lib-specific
export const NAME_LONG = 'AI-Powered Fullstack Components'
export const NAME_SHORT = 'Fullstack Components'
export const NAME_LIB = '@trikinco/fullstack-components'
export const NAME_DESCRIPTION = 'AI-powered library for Next.js'
export const URL_NPM =
	'https://www.npmjs.com/package/@trikinco/fullstack-components'
export const URL_GITHUB = 'https://github.com/trikinco/fullstack-components'
export const URL_DISCUSSIONS =
	'https://github.com/trikinco/fullstack-components/discussions'
export const URL_LICENSE =
	'https://github.com/trikinco/fullstack-components/blob/main/LICENSE'
export const URL_RELEASES =
	'https://github.com/trikinco/fullstack-components/releases'

// Meta info
export const META_AUTHORS = [
	{ name: 'Lars Magnus Klavenes', url: 'https://larsmagnus.co' },
	{ name: "Darragh O'Riordan", url: 'https://www.darraghoriordan.com' },
	{ name: 'Connor Thomsen', url: 'https://www.connorthomsen.com' },
]

// Id's
export const ID_DIALOG_PORTAL = 'dialog-portal'
export const ID_MAIN = 'main-content'
export const ID_DOCS_NAV = 'docs-nav'

// Use process.env.PORT by default and fallback to port 3000
export const PORT = process.env.PORT || 3000
export const URL_BASE = `http://localhost:${PORT}`

export const URL_DEPLOYMENT =
	process.env.VERCEL_ENV === 'preview'
		? `https://${process.env.VERCEL_URL}`
		: process.env.NEXT_PUBLIC_HOST || ''
