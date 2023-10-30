import type { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { merge } from '../utils/styles'

export interface NavProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export const Nav = ({ children, className, ...rest }: NavProps) => {
	return (
		<nav className={merge('p-6', className)} {...rest}>
			<Link href="/">
				<Image
					src="/images/MobiusStrip.png"
					alt="Logo"
					width={30}
					height={30}
				/>
			</Link>
			{children}
		</nav>
	)
}
