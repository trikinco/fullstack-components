'use client'

import { useState } from 'react'
import { ErrorEnhancementBoundary } from '@trikinco/fullstack-components/client'
import { Button } from '@/src/components/Button'
import { Spinner } from '@/src/components/Spinner'

export default function DemoError() {
	const [shouldRenderThrow, setShouldRenderThrow] = useState(false)

	// Throw an error in a component instead of rendering
	const ComponentToThrowError = () => {
		// Throw an error here

		let number = 123 as unknown as string
		number.split('')

		return null
	}

	return (
		<div className="p-6 text-black">
			<ErrorEnhancementBoundary
				className="overflow-auto"
				fallback={
					<Spinner className="mb-3">
						Generating user-friendly error message
					</Spinner>
				}
			>
				{shouldRenderThrow && <ComponentToThrowError />}

				<Button
					color="secondary"
					onClick={() => {
						setShouldRenderThrow(true)
					}}
					className="font-medium dark:hover:bg-slate-800"
				>
					Howdy 🤠
				</Button>
			</ErrorEnhancementBoundary>
		</div>
	)
}
