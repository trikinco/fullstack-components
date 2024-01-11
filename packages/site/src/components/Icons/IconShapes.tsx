import type { SVGAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

/**
 * https://www.svgrepo.com/collection/dazzle-line-icons/
 */
export const IconShapes = ({
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
			d="m8 10 4-7 4 7H8ZM10 17.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM14 14h7v7h-7v-7Z"
		/>
	</svg>
)
