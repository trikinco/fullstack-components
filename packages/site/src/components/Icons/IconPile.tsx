import type { SVGAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

/**
 * https://www.svgrepo.com/collection/dazzle-line-icons/
 */
export const IconPile = ({
	className,
	...rest
}: SVGAttributes<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		className={merge('w-5 h-5', className)}
		fill="none"
		aria-hidden="true"
		{...rest}
	>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M11 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM17 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 6.81a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 17.19a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 17.19a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM20 17.19a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
		/>
	</svg>
)
