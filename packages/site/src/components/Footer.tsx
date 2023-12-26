import type { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import { IconLogo } from './Icons/IconLogo'
import {
	NAME_SHORT,
	NAME_LIB,
	URL_GITHUB,
	URL_NPM,
	URL_DISCUSSIONS,
} from '../utils/constants'
import { IconGitHub } from './Icons/IconGitHub'
import { IconNpm } from './Icons/IconNpm'
import { Avatar } from './Avatar'
import { routesFooterMeta } from '../utils/routes'

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export const Footer = ({ children, className, ...rest }: FooterProps) => {
	return (
		<>
			<footer
				className={merge(
					'pt-12 md:py-12 sm:pb-6 md:px-6 mt-10 bg-white dark:bg-slate-950 border-t border-slate-950/10 dark:border-white/10',
					className
				)}
				{...rest}
			>
				<div className="flex flex-wrap gap-10 md:gap-16 items-center max-w-6xl mx-auto">
					<div className="hidden sm:flex gap-3 mb-auto px-6">
						<Link href="/" className="rounded-full focus-ring">
							<IconLogo className="w-5 h-5" width={20} height={20} />
						</Link>
						<Link
							href={URL_NPM}
							className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 rounded-full focus-ring"
						>
							<span className="sr-only">{NAME_SHORT} on NPM</span>
							<IconNpm className="w-8" width={32} height={20} />
						</Link>
						<Link
							href={URL_GITHUB}
							className="ml-auto block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 rounded-full focus-ring"
						>
							<span className="sr-only">{NAME_SHORT} on GitHub</span>
							<IconGitHub width={20} height={20} />
						</Link>
					</div>
					<div className="flex flex-col gap-2 px-6">
						<h3 className="font-bold mb-2">Resources</h3>
						{routesFooterMeta.map(({ href, title }) => (
							<Link
								key={href}
								className="hover:underline rounded-sm focus-ring"
								href={href}
							>
								{title}
							</Link>
						))}
					</div>
					{children}
					<div className="flex items-center p-6 sm:ml-auto w-full sm:w-auto mb-auto gap-2 md:gap-3 bg-white dark:bg-black border-t border-slate-950/10 dark:border-white/30 sm:bg-transparent dark:sm:bg-transparent sm:border-t-0">
						<Link
							href="/"
							className="rounded-full focus-ring mr-auto sm:hidden"
						>
							<IconLogo className="w-5 h-5" width={20} height={20} />
						</Link>
						<h3 className="text-xs my-auto sm:m-auto">Created by</h3>
						<div className="flex gap-2 md:gap-3">
							<Avatar
								href="https://www.darraghoriordan.com"
								image={{ src: '/images/darragh.png', alt: 'Darragh ORiordan' }}
							/>
							<Avatar
								href="https://larsmagnus.co"
								image={{
									src: '/images/lars.png',
									alt: 'Lars Klavenes',
									className: 'bg-slate-200 dark:bg-slate-300',
								}}
							/>
							<Avatar
								href="https://www.connorthomsen.com"
								image={{ src: '/images/connor.png', alt: 'Connor Thomsen' }}
							/>
						</div>
					</div>
				</div>
			</footer>
			<div className="flex gap-3 justify-between text-sm p-6 bg-white/20 dark:bg-black border-t border-slate-950/10 dark:border-transparent">
				<p>
					<strong>
						<Link className="focus-ring" href={URL_GITHUB}>
							{NAME_LIB} is built in public.
						</Link>
					</strong>
				</p>
				<p className="hidden md:block">
					Got feedback? We&apos;d like to{' '}
					<Link className="underline focus-ring" href={URL_DISCUSSIONS}>
						hear from you.
					</Link>
				</p>
			</div>
		</>
	)
}
