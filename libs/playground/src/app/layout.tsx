import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/globals.css'

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
				<footer className="flex py-3 px-6 bg-slate-100 dark:bg-slate-800 items-center border-t-2 border-gray-200 dark:border-gray-700">
					<div className="ml-auto flex gap-3">
						<span className="my-auto">Created by</span>
						<Link href="https://www.darraghoriordan.com">
							<Image
								className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-300 dark:bg-slate-600 dark:border-slate-600"
								src="/images/darragh.png"
								alt="Darragh ORiordan"
								width={40}
								height={40}
							/>
						</Link>
						<Link href="https://larsmagnus.co">
							<Image
								className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-200 dark:bg-slate-300 dark:border-slate-600"
								src="/images/lars.png"
								alt="Lars Klavenes"
								width={40}
								height={40}
							/>
						</Link>
						<Link href="https://www.connorthomsen.com">
							<Image
								className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-300 dark:bg-slate-600 dark:border-slate-600"
								src="/images/connor.png"
								alt="Connor Thomsen"
								width={40}
								height={40}
							/>
						</Link>
					</div>
				</footer>
			</body>
		</html>
	)
}
