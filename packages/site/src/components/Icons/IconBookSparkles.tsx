import type { SVGAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

/**
 * https://www.svgrepo.com/collection/dazzle-line-icons/
 */
export const IconBookSparkles = ({
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
			d="M5 19V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C6.52 3 7.08 3 8.2 3h7.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C19 4.52 19 5.08 19 6.2V17H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12m-1-4v4M10 6v4m4 0v4M8 8h4m0 4h4"
		/>
	</svg>
)
