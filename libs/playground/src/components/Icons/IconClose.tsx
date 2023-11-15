import type { HTMLAttributes } from 'react'
import { merge } from '../../utils/styles'

/**
 * https://www.svgrepo.com/collection/dazzle-line-icons/
 */
export const IconClose = ({
	className,
	...rest
}: HTMLAttributes<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		className={merge('w-5 h-5', className)}
		fill="none"
		aria-hidden="true"
		{...rest}
	>
		<path
			d="M6 6L18 18M18 6L6 18"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)
