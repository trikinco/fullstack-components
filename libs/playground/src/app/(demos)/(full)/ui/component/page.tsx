'use client'

import Script from 'next/script'
import { PageHeader } from '@/src/components/PageHeader'
import { Block } from '@/src/modules/Block'
import { NAME_LIB, NAME_SHORT, NAME_LONG } from '@/src/utils/constants'

export default function Page() {
	return (
		<>
			<PageHeader
				className="max-w-prose mx-auto text-center"
				title="Generative UI - Blocks"
			/>
			{/* Temporary solution -> trigger build during esm step in Block */}
			<Script src="https://cdn.tailwindcss.com" />

			<Block
				prompt={`A navbar with a modern SVG logo, ${NAME_LIB} and some links. Dark bg, light text.`}
			/>
			<Block
				prompt={`A sleek UI hero section with some text about ${NAME_LONG}. Dark bg, light text.`}
			/>
			<Block
				prompt={`A two-column call to action section with a purple button and some text listing some features of ${NAME_LONG} in one column, and a photo from Unsplash in the other column. Dark bg, light text.`}
			/>
			<Block
				prompt={`A footer with copyright for this year - ${NAME_SHORT}. Dark bg, light text.`}
			/>
		</>
	)
}
