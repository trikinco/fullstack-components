'use client'
import type { HTMLAttributes, ReactNode, ElementRef } from 'react'
import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import { NAME_SHORT, URL_GITHUB, URL_NPM } from '@/src/utils/constants'
import { IconGitHub } from '@/src/components/Icons/IconGitHub'
import { IconNpm } from '@/src/components/Icons/IconNpm'
import { ThemeSwitcher } from '@/src/modules/Theme/ThemeSwitcher'
import { FlexSearch } from '@/src/modules/Search/FlexSearch'
import useIsStuck from '@/src/hooks/useIsStuck'

export interface NavProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export const Nav = ({ children, className, ...rest }: NavProps) => {
	const { ref, isStuck } = useIsStuck<ElementRef<'nav'>>()

	return (
		<nav
			ref={ref}
			className={merge(
				'flex sticky top-[-1px] left-0 backdrop-blur-md items-center p-6 2xl:mb-8 z-20 print:hidden',
				'transition-colors ease-in-out',
				'border-b border-slate-950/5 dark:border-white/10 2xl:border-transparent 2xl:dark:border-transparent',
				isStuck && '2xl:border-slate-950/5 2xl:dark:border-white/10',
				className
			)}
			{...rest}
		>
			<Link
				href="/"
				className="rounded-full focus-ring font-mono font-bold lowercase text-xs sm:text-base dark:text-white z-30"
			>
				{NAME_SHORT}
			</Link>

			{children}

			<div className="flex gap-3 sm:gap-6 ml-auto min-h-9">
				<FlexSearch
					placeholder="Search documentation..."
					className="hidden md:block"
				/>
				<ThemeSwitcher className="flex flex-col justify-center" />
				<Link
					href={URL_NPM}
					className="inline-flex items-center text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 rounded-full focus-ring"
				>
					<span className="sr-only">{NAME_SHORT} on NPM</span>
					<IconNpm className="w-8" width={32} height={10} />
				</Link>
				<Link
					href={URL_GITHUB}
					className="inline-flex items-center text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 rounded-full focus-ring"
				>
					<span className="sr-only">{NAME_SHORT} on GitHub</span>
					<IconGitHub width={20} height={20} />
				</Link>
			</div>
		</nav>
	)
}

export default Nav
