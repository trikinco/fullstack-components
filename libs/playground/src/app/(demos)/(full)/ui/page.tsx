'use client'

import { useState, useRef, FormEvent } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { useUi } from '@/src/hooks/useUi'
import { GenerativeUI } from '@/src/modules/GenerativeUI'

export default function Page() {
	const formRef = useRef<HTMLFormElement>(null)
	const [prompt, setPrompt] = useState('an FAQ accordion')

	const { fetchUi, content, isLoading, isError } = useUi(prompt)

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		const target = formRef?.current as
			| (HTMLFormElement & {
					// input `name`
					prompt?: {
						value?: string
					}
			  })
			| null
		const value = target?.prompt?.value

		if (value && value !== prompt) {
			setPrompt(value)
		}
	}

	return (
		<>
			<PageHeader
				className="max-w-prose mx-auto text-center"
				title="Generative UI"
			/>

			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className="mb-10 px-5 mx-auto max-w-prose"
			>
				<label htmlFor="prompt" className="sr-only">
					Generate a UI component
				</label>
				<input
					className="p-3 rounded-md border border-white/10 shadow-lg w-full"
					type="text"
					id="prompt"
					name="prompt"
					placeholder="Generate a UI component"
					defaultValue={prompt}
					minLength={2}
					maxLength={300}
				/>
				<button type="submit" className="sr-only">
					Submit
				</button>
			</form>

			<GenerativeUI
				refetch={() => fetchUi(prompt)}
				prompt={prompt}
				content={content}
				isLoading={isLoading}
				isError={isError}
			/>
		</>
	)
}
