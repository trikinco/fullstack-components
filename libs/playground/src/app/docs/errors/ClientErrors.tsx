'use client'

import { ErrorPreview } from './ErrorPreview'

/**
 * Declare a non-existent global var to make it easier
 * to throw and catch a ReferenceError
 */
declare global {
	const notActuallyGlobal: string
}

export function ClientErrors() {
	return (
		<>
			<ErrorPreview
				onClick={() => {
					let number = 123 as unknown as string
					number.split('')
				}}
				label="TypeError"
			/>

			<ErrorPreview
				onClick={() => {
					console.log(notActuallyGlobal)
				}}
				label="ReferenceError"
			/>

			<ErrorPreview
				onClick={() => {
					throw new Error('SyntaxError: Unexpected token }')
				}}
				label="SyntaxError"
			/>

			<ErrorPreview
				onClick={() => {
					throw new RangeError('The number is too high')
				}}
				label="RangeError"
			/>

			<ErrorPreview
				onClick={() => {
					decodeURI('%a`bc')
				}}
				label="URIError"
			/>
		</>
	)
}
