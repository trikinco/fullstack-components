import type { HTMLAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

/**
 * https://www.svgrepo.com/collection/dazzleLine-icons/
 */
export const IconCode = ({
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
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="m7 8-4 3.692L7 16m10-8 4 3.692L17 16M14 4l-4 16"
		/>
	</svg>
)
