import type { HTMLAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export const IconThemeSystem = ({
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
		<g clipPath="url(#c)">
			<path fill="#000" fillOpacity=".4" d="M250 0h250v500H250z" />
			<path
				fill="#13151A"
				stroke="#373E4E"
				strokeWidth="8"
				d="M246 76h258v428H246z"
			/>
			<rect
				width="226.743"
				height="158.476"
				x="110"
				y="218"
				fill="#3D4150"
				rx="20"
			/>
			<rect
				width="226.743"
				height="158.476"
				x="366.743"
				y="218"
				fill="#3D4150"
				rx="20"
			/>
			<rect
				width="226.743"
				height="158.476"
				x="110"
				y="406.476"
				fill="#3D4150"
				rx="20"
			/>
			<rect
				width="226.743"
				height="158.476"
				x="366.743"
				y="406.476"
				fill="#3D4150"
				rx="20"
			/>
			<path
				fill="#3D4150"
				fillOpacity=".3"
				stroke="#373E4E"
				strokeWidth="8"
				d="M246 76h258v108H246z"
			/>
		</g>
		<mask
			id="d"
			width="250"
			height="500"
			x="0"
			y="0"
			maskUnits="userSpaceOnUse"
			style={{ maskType: 'alpha' }}
		>
			<path fill="#000" d="M0 0h250v500H0z" />
		</mask>
		<g clipPath="url(#e)" mask="url(#d)">
			<path fill="#000" d="M60 122c0-16.569 13.431-30 30-30h60v408H60V122Z" />
			<path
				fill="#fff"
				stroke="#000"
				strokeWidth="8"
				d="M254 80v-4H110c-18.778 0-34 15.222-34 34v394h178V80Z"
			/>
			<path
				fill="#F7F8FB"
				stroke="#000"
				strokeWidth="8"
				d="M254 80v-4H110c-18.778 0-34 15.222-34 34v74h178V80Z"
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
				x="110"
				y="406.476"
				fill="#F3F5F9"
				rx="20"
			/>
		</g>
	</svg>
)
