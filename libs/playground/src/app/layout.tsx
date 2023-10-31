import '../styles/globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import { URL_BASE, DEPLOYMENT_URL, NAME_LONG } from '../utils/constants'

const fontBase = Space_Grotesk({ subsets: ['latin'], variable: '--font-base' })
const fontMono = Space_Mono({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-mono',
})

export const metadata: Metadata = {
	metadataBase: new URL(DEPLOYMENT_URL || URL_BASE),
	title: NAME_LONG,
	description: NAME_LONG,
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
			<body className={`font-sans ${fontBase.variable} ${fontMono.variable}`}>
				<Nav />
				{children}
				{error}
				<Footer />
			</body>
		</html>
	)
}
