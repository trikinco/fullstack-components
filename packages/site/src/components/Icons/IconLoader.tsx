import type { SVGAttributes } from 'react'
import { merge } from '../../../../fullstack-components/dist/utils'

/**
 * https://www.svgrepo.com/collection/dazzleLine-icons/
 */
export const IconLoader = ({
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
			d="M12 3v3m0 12v3m-6-9H3m18 0h-3M5.637 5.637 7.76 7.76m8.482 8.482 2.121 2.121m.002-12.728-2.12 2.12m-8.487 8.487-2.123 2.123"
		/>
	</svg>
)
