import type { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { merge } from '../utils/styles'
import { NAME_SHORT, URL_GITHUB } from '../utils/constants'
import { IconGitHub } from './Icons/IconGitHub'
import { IconLogo } from './Icons/IconLogo'

export interface NavProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export const Nav = ({ children, className, ...rest }: NavProps) => {
	return (
		<nav
			className={merge(
				'flex sticky top-0 left-0 backdrop-blur-md items-center p-6',
				className
			)}
			{...rest}
		>
			<Link href="/">
				<IconLogo className="w-10 h-10" />
			</Link>
			{children}

			<Link
				href={URL_GITHUB}
				className="ml-auto block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
			>
				<span className="sr-only">{NAME_SHORT} on GitHub</span>
				<IconGitHub />
			</Link>
		</nav>
	)
}
