import { merge } from '../utils'
import type { SVGProps } from 'react'

export interface WaveformProps extends SVGProps<SVGSVGElement> {
	/**
	 * Spacing between each SVG `<line>`.
	 */
	spacing?: number
	/**
	 * Stroke width of each SVG `<line>`.
	 */
	strokeWidth?: number
	/**
	 * SVG height
	 */
	width: number
	/**
	 * SVG width
	 */
	height: number
	/**
	 * Decoded AudioBuffer amplitude data
	 */
	data: number[]
}

/**
 * An `<svg>` waveform vizualisation for a media file showing amplitude changes over time.
 */
export function Waveform({
	width,
	height,
	data,
	className,
	spacing = 4,
	strokeWidth = 2,
	...rest
}: WaveformProps) {
	return (
		<svg
			width={width}
			height={height}
			fill="none"
			viewBox={`0 0 ${width} ${height}`}
			xmlns="http://www.w3.org/2000/svg"
			className={merge('w-full', className)}
			{...rest}
		>
			{data.map((value, index) => {
				const centerY = height / 2 // Center line of the waveform
				const x = (index + strokeWidth / 2) * spacing // x position for each line with uniform spacing
				const y1 = Math.ceil(centerY - value) // y for the top part of the waveform
				const y2 = Math.floor(centerY + value) // y for the bottom part (mirrored)

				return (
					<line
						key={index}
						x1={x}
						y1={y1}
						x2={x}
						y2={y2}
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={strokeWidth}
					/>
				)
			})}
		</svg>
	)
}

export default Waveform
