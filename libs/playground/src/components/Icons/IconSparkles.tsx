import type { HTMLAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

/**
 * https://www.svgrepo.com/collection/dazzleLine-icons/
 */
export const IconSparkles = ({
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
			d="M19 3v4m-2-2h4m-2 12v4m-2-2h4M10 5 8.53 8.727c-.188.477-.282.715-.426.916a2 2 0 0 1-.461.461c-.201.144-.44.238-.916.426L3 12l3.727 1.47c.477.188.715.282.916.426.178.127.334.283.461.461.144.201.238.44.426.916L10 19l1.47-3.727c.188-.477.282-.715.426-.916.127-.178.283-.334.461-.461.201-.144.44-.238.916-.426L17 12l-3.727-1.47c-.477-.188-.715-.282-.916-.426a2.003 2.003 0 0 1-.461-.461c-.144-.201-.238-.44-.426-.916L10 5Z"
		/>
	</svg>
)
