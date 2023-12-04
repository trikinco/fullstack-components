import type { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import {
	NAME_LIB,
	NAME_SHORT,
	URL_DISCUSSIONS,
	URL_GITHUB,
	URL_NPM,
} from '../utils/constants'
import { IconGitHub } from './Icons/IconGitHub'
import { IconLogo } from './Icons/IconLogo'
import { IconNpm } from './Icons/IconNpm'
import { ThemeSwitcher } from '@/src/modules/ThemeSwitcher'

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
						<Link className="focus-ring" href={URL_GITHUB}>
							{NAME_LIB}
						</Link>{' '}
						is built in public. Use with care in production.
					</strong>{' '}
				</p>
				<p className="hidden md:block">
					Got feedback? We&apos;d like to{' '}
					<Link className="underline focus-ring" href={URL_DISCUSSIONS}>
						hear from you.
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
				<Link href="/" className="rounded-full focus-ring">
					<IconLogo className="w-6 h-6 md:w-10 md:h-10" />
				</Link>
				{children}

				<div className="flex gap-6 ml-auto">
					<ThemeSwitcher />
					<Link
						href={URL_NPM}
						className="inline-flex items-center text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 rounded-full focus-ring"
					>
						<span className="sr-only">{NAME_SHORT} on NPM</span>
						<IconNpm className="w-8" />
					</Link>
					<Link
						href={URL_GITHUB}
						className="inline-flex items-center text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 rounded-full focus-ring"
					>
						<span className="sr-only">{NAME_SHORT} on GitHub</span>
						<IconGitHub />
					</Link>
				</div>
			</nav>
		</>
	)
}
