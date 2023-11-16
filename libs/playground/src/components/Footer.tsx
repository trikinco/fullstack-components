import type { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { merge } from '../utils/styles'
import { IconLogo } from './Icons/IconLogo'
import { NAME_SHORT, URL_GITHUB } from '../utils/constants'
import { IconGitHub } from './Icons/IconGitHub'

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export const Footer = ({ children, className, ...rest }: FooterProps) => {
	return (
		<footer
			className={merge(
				'py-3 px-6 bg-slate-100 dark:bg-slate-950 border-t border-slate-950/10 dark:border-white/30',
				className
			)}
			{...rest}
		>
			<div className="flex items-center max-w-6xl mx-auto">
				<div className="flex gap-3">
					<Link
						href="/"
						className="rounded-full ring-offset-2 focus:outline-none focus:ring"
					>
						<IconLogo className="w-5 h-5" />
					</Link>
					<Link
						href={URL_GITHUB}
						className="ml-auto block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 rounded-full ring-offset-2 focus:outline-none focus:ring"
					>
						<span className="sr-only">{NAME_SHORT} on GitHub</span>
						<IconGitHub />
					</Link>
				</div>
				{children}
				<div className="ml-auto flex gap-3">
					<span className="my-auto">Created by</span>
					<Link
						href="https://www.darraghoriordan.com"
						className="w-10 h-10 rounded-full focus:outline-none focus:ring"
					>
						<Image
							className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-300 dark:bg-slate-600 dark:border-slate-600"
							src="/images/darragh.png"
							alt="Darragh ORiordan"
							width={40}
							height={40}
						/>
					</Link>
					<Link
						href="https://larsmagnus.co"
						className="w-10 h-10 rounded-full focus:outline-none focus:ring"
					>
						<Image
							className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-200 dark:bg-slate-300 dark:border-slate-600"
							src="/images/lars.png"
							alt="Lars Klavenes"
							width={40}
							height={40}
						/>
					</Link>
					<Link
						href="https://www.connorthomsen.com"
						className="w-10 h-10 rounded-full focus:outline-none focus:ring"
					>
						<Image
							className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-300 dark:bg-slate-600 dark:border-slate-600"
							src="/images/connor.png"
							alt="Connor Thomsen"
							width={40}
							height={40}
						/>
					</Link>
				</div>
			</div>
		</footer>
	)
}
