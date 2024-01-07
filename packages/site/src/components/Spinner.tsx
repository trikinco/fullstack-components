import type { ReactNode, HTMLAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
	/** class names passed to the SVG spinner */
	classNameSpinner?: string
	/** assistive tech status text. Default: 'Loading...' */
	label?: string
}

export const Spinner = ({
	children,
	classNameSpinner,
	label = 'Loading...',
	...rest
}: SpinnerProps) => {
	return (
		<div role="status" {...rest}>
			<svg
				aria-hidden="true"
				className={merge(
					'w-8 h-8 text-slate-200 animate-spin dark:text-slate-600 fill-blue-600 dark:fill-white',
					children && 'mb-3',
					classNameSpinner
				)}
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z"
					fill="currentColor"
				/>
				<path
					d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z"
					fill="currentFill"
				/>
			</svg>
			<span className="sr-only">{label}</span>
			{children}
		</div>
	)
}

export default Spinner
