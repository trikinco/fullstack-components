import type { SVGAttributes } from 'react'
import { merge } from '../../utils'

export function IconPause({
	className,
	...rest
}: SVGAttributes<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className={merge('size-5', className)}
			fill="none"
			aria-hidden="true"
			{...rest}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M8 5v14m8-14v14"
			/>
		</svg>
	)
}

export default IconPause
