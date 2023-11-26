'use client'

import Script from 'next/script'
import { Block } from '@trikinco/fullstack-components/client'
import { Spinner } from '@/src/components/Spinner'
import { NAME_LIB, NAME_SHORT, NAME_LONG } from '@/src/utils/constants'

export default function Blocks() {
	return (
		<div className="w-full">
			{/* Temporary solution -> trigger build during esm step in Block */}
			<Script src="https://cdn.tailwindcss.com" />

			<Block
				prompt={`A navbar with a modern SVG logo, ${NAME_LIB} and some links. Dark bg, light text.`}
				loading={
					<Spinner
						className="flex gap-3 p-3 items-center"
						classNameSpinner="mb-0"
					>
						Creating navbar component...
					</Spinner>
				}
			/>
			<Block
				prompt={`A sleek UI hero section with some text about ${NAME_LONG}. Dark bg, light text.`}
				loading={
					<Spinner
						className="flex gap-3 p-3 items-center"
						classNameSpinner="mb-0"
					>
						Creating hero component...
					</Spinner>
				}
			/>
			<Block
				prompt={`A two-column call to action section with a purple button and some text listing some features of ${NAME_LONG} in one column, and a photo from Unsplash in the other column. Dark bg, light text.`}
				loading={
					<Spinner
						className="flex gap-3 p-3 items-center"
						classNameSpinner="mb-0"
					>
						Creating call to action component...
					</Spinner>
				}
			/>
			<Block
				prompt={`A footer with copyright for this year - ${NAME_SHORT}. Dark bg, light text.`}
				loading={
					<Spinner
						className="flex gap-3 p-3 items-center"
						classNameSpinner="mb-0"
					>
						Creating footer component...
					</Spinner>
				}
			/>
		</div>
	)
}
