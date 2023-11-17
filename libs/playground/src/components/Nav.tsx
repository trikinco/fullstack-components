import type { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import { NAME_LIB, NAME_SHORT, URL_GITHUB } from '../utils/constants'
import { IconGitHub } from './Icons/IconGitHub'
import { IconLogo } from './Icons/IconLogo'

export interface NavProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export const Nav = ({ children, className, ...rest }: NavProps) => {
	return (
		<>
			<div className="flex justify-between text-sm p-6 bg-white dark:bg-transparent border-b border-slate-950/10 dark:border-white/30">
				<p>
					<strong>
						<span role="img" aria-label="Hey there, hand waving">
							👋
						</span>{' '}
						<Link href={URL_GITHUB}>{NAME_LIB}</Link> is built in public, and
						not ready for production use.
					</strong>{' '}
				</p>
				<p>
					We&apos;re just getting started and{' '}
					<Link
						className="underline"
						href="https://github.com/trikinco/fullstack-components/discussions"
					>
						feedback is encouraged.
					</Link>
				</p>
			</div>
			<nav
				className={merge(
					'flex sticky top-0 left-0 backdrop-blur-md items-center p-6',
					className
				)}
				{...rest}
			>
				<Link
					href="/"
					className="rounded-full ring-offset-2 focus:outline-none focus:ring"
				>
					<IconLogo className="w-10 h-10" />
				</Link>
				{children}

				<Link
					href={URL_GITHUB}
					className="ml-auto block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 rounded-full ring-offset-2 focus:outline-none focus:ring"
				>
					<span className="sr-only">{NAME_SHORT} on GitHub</span>
					<IconGitHub />
				</Link>
			</nav>
		</>
	)
}
