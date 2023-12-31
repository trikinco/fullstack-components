import type { ReactNode, DetailedHTMLProps, AnchorHTMLAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export interface SkipLinkProps
	extends DetailedHTMLProps<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {
	children?: ReactNode
}

/**
 * Skip link to jump past repetetive content
 * Uses `<a>` as `Link` from 'next/link' doesn't handle focus correctly for internal/fragment links
 */
export function SkipLink({ children, className, ...rest }: SkipLinkProps) {
	return (
		<a className={merge('sr-only focus:not-sr-only', className)} {...rest}>
			{children}
		</a>
	)
}

export default SkipLink
