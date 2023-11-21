import type { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import { NAME_LIB, NAME_SHORT, URL_GITHUB, URL_NPM } from '../utils/constants'
import { IconGitHub } from './Icons/IconGitHub'
import { IconLogo } from './Icons/IconLogo'
import { IconNpm } from './Icons/IconNpm'

export interface NavProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export const Nav = ({ children, className, ...rest }: NavProps) => {
	return (
		<>
			<div className="flex gap-3 justify-between text-sm p-6 bg-white dark:bg-black border-b border-slate-950/10 dark:border-white/30">
				<p>
					<strong>
						<span role="img" aria-label="Hey there, hand waving">
							👋
						</span>{' '}
						<Link href={URL_GITHUB}>{NAME_LIB}</Link> is built in public, and
						not ready for production use.
					</strong>{' '}
				</p>
				<p className="hidden md:block">
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
					'flex sticky top-0 left-0 backdrop-blur-md items-center p-6 z-20 border-b border-slate-950/5 dark:border-white/10',
					className
				)}
				{...rest}
			>
				<Link
					href="/"
					className="rounded-full ring-offset-2 focus:outline-none focus:ring"
				>
					<IconLogo className="w-6 h-6 md:w-10 md:h-10" />
				</Link>
				{children}

				<div className="flex gap-6 ml-auto">
					<Link
						href={URL_NPM}
						className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 rounded-full ring-offset-2 focus:outline-none focus:ring"
					>
						<span className="sr-only">{NAME_SHORT} on NPM</span>
						<IconNpm className="w-8" />
					</Link>
					<Link
						href={URL_GITHUB}
						className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 rounded-full ring-offset-2 focus:outline-none focus:ring"
					>
						<span className="sr-only">{NAME_SHORT} on GitHub</span>
						<IconGitHub />
					</Link>
				</div>
			</nav>
		</>
	)
}
