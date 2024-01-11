// Utils
export const PORT = process.env.PORT || 3000
export const URL_LOCAL = `http://localhost:${PORT}`
export const URL_HOST =
	process.env.VERCEL_ENV === 'preview'
		? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
		: process.env.NEXT_PUBLIC_HOST || URL_LOCAL
export const IS_DEV = process.env.NODE_ENV === 'development'

// Lib-specific
export const NAME_LONG = 'AI-Powered Fullstack Components'
export const NAME_SHORT = 'Fullstack Components'
export const NAME_LIB = '@trikinco/fullstack-components'
export const NAME_DESCRIPTION = 'AI-powered building blocks for Next.js'
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
export const ID_DOCS_TOC = 'docs-toc'
export const ID_FOOTER = 'footer'

// Toc config
export const TOC_HEADINGS: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')[] = [
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
]
