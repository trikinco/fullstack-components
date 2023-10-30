import '../styles/globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Footer } from '../components/Footer'

const font = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'AI-Powered Fullstack Components',
	description: 'AI-powered fullstack components',
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
			<body className={font.className}>
				{children}
				{error}
				<Footer />
			</body>
		</html>
	)
}
