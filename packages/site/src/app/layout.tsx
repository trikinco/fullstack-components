import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import { Providers } from '@/src/providers/Providers'
import { Footer } from '@/src/components/Footer'
import { Nav } from '@/src/components/Nav'
import SkipLink from '@/src/components/SkipLink'
import {
	URL_HOST,
	NAME_SHORT,
	NAME_LONG,
	META_AUTHORS,
	ID_DIALOG_PORTAL,
	ID_MAIN,
} from '../utils/constants'
import { fontClassNames } from '../utils/fonts'

export const viewport: Viewport = {
	themeColor: '#0f172a',
	colorScheme: 'light dark',
}

export const metadata: Metadata = {
	metadataBase: new URL(URL_HOST),
	description: NAME_LONG,
	keywords: ['Fullstack', 'Components', 'Next.js', 'React', 'AI'],
	authors: META_AUTHORS,
	title: {
		template: `%s | ${NAME_SHORT}`,
		default: NAME_LONG,
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
		<html lang="en" suppressHydrationWarning>
			{/**
			 * Apply the main body font `font-sans` with a custom CSS variable, also set in tailwind.config
			 * the mono font is just set as a variable and will only be used as needed with `font-mono`
			 * @see {@link https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css Next fonts with Tailwind CSS}
			 */}
			<body className={fontClassNames}>
				<Providers>
					<SkipLink
						href={`#${ID_MAIN}`}
						className="bg-slate-50 dark:bg-slate-950 focus:mb-6 focus:absolute focus:z-50 top-3 left-3 rounded-sm focus-ring"
					>
						Skip to the main content
					</SkipLink>
					<Nav />
					{children}
					{error}
					<Analytics />
					<Footer />
					<div id={ID_DIALOG_PORTAL} />
				</Providers>
			</body>
		</html>
	)
}
