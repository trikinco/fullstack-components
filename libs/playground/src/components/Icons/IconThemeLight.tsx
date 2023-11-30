import type { HTMLAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export const IconThemeLight = ({
	className,
	...rest
}: HTMLAttributes<SVGSVGElement>) => (
	<svg
		viewBox="0 0 500 500"
		xmlns="http://www.w3.org/2000/svg"
		className={merge('w-20 h-20', className)}
		fill="none"
		aria-hidden="true"
		{...rest}
	>
		<path fill="#000" d="M60 122c0-16.569 13.431-30 30-30h60v408H60V122Z" />
		<path
			fill="#fff"
			stroke="#000"
			strokeWidth="8"
			d="M504 80v-4H110c-18.778 0-34 15.222-34 34v394h428V80Z"
		/>
		<path
			fill="#F7F8FB"
			stroke="#000"
			strokeWidth="8"
			d="M504 80v-4H110c-18.778 0-34 15.222-34 34v74h428V80Z"
		/>
		<circle cx="130" cy="130" r="20" fill="#FF5871" />
		<circle cx="200" cy="130" r="20" fill="#BA1FCE" />
		<rect
			width="226.743"
			height="158.476"
			x="110"
			y="218"
			fill="#F3F5F9"
			rx="20"
		/>
		<rect
			width="226.743"
			height="158.476"
			x="366.743"
			y="218"
			fill="#F3F5F9"
			rx="20"
		/>
		<rect
			width="226.743"
			height="158.476"
			x="110"
			y="406.476"
			fill="#F3F5F9"
			rx="20"
		/>
		<rect
			width="226.743"
			height="158.476"
			x="366.743"
			y="406.476"
			fill="#F3F5F9"
			rx="20"
		/>
	</svg>
)
