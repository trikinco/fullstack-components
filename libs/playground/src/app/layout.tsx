import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import {
	URL_BASE,
	URL_DEPLOYMENT,
	NAME_SHORT,
	NAME_LONG,
	ID_DIALOG_PORTAL,
} from '../utils/constants'
import { fontClassNames } from '../utils/fonts'

export const metadata: Metadata = {
	metadataBase: new URL(URL_DEPLOYMENT || URL_BASE),
	description: NAME_LONG,
	keywords: ['Fullstack', 'Components', 'Next.js', 'React', 'AI'],
	authors: [
		{ name: 'Lars Magnus Klavenes', url: 'https://larsmagnus.co' },
		{ name: "Darragh O'Riordan", url: 'https://www.darraghoriordan.com' },
		{ name: 'Connor Thomsen', url: 'https://www.connorthomsen.com' },
	],
	title: {
		template: `%s | ${NAME_SHORT}`,
		default: NAME_LONG,
	},
}

export default function RootLayout({
	children,
	error,
}: {
	children: React.ReactNode
	/**
	 * Error page slot - see `app/@error`
	 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/parallel-routes Parallel routes}
	 */
	error: React.ReactNode
}) {
	return (
		<html lang="en">
			{/**
			 * Apply the main body font `font-sans` with a custom CSS variable, also set in tailwind.config
			 * the mono font is just set as a variable and will only be used as needed with `font-mono`
			 * @see {@link https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css Next fonts with Tailwind CSS}
			 */}
			<body className={fontClassNames}>
				<Nav />
				{children}
				{error}
				<Analytics />
				<Footer />
				<div id={ID_DIALOG_PORTAL} />
			</body>
		</html>
	)
}
