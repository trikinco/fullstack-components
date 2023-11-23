'use client'

import { useState, useRef, FormEvent } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { useGenerateUI } from '@/src/hooks/useGenerateUI'
import { GenerativeUI } from '@/src/modules/GenerativeUI'
import { ColorPicker } from '@/src/components/ColorPicker/ColorPicker'

export default function Page() {
	const formRef = useRef<HTMLFormElement>(null)
	const [prompt, setPrompt] = useState('')
	const [src, setSrc] = useState('')
	const [colors, setColors] = useState('')

	const { fetchUi, content, isLoading, isError } = useGenerateUI({
		prompt,
		src,
		colors,
	})

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		const target = formRef?.current as HTMLFormElement | null
		const formData = target ? new FormData(target) : null
		const newPrompt = formData?.get('prompt')?.valueOf() as string
		const newSrc = formData?.get('src')?.valueOf() as string
		const newColors = formData?.get('colors')?.valueOf() as string

		if (newPrompt && newPrompt !== prompt) {
			setPrompt(newPrompt)
		}
		if (newSrc && newSrc !== src) {
			setSrc(newSrc)
		}
		if (newColors && newColors !== colors) {
			setColors(colors)
		}
	}

	return (
		<>
			<PageHeader className="max-w-prose mx-auto" title="Generative UI" />

			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className="mb-10 mx-auto max-w-prose flex flex-col gap-3"
			>
				<label htmlFor="prompt">Generate a UI component</label>
				<input
					className="p-3 rounded-md border border-white/10 shadow-lg w-full"
					type="text"
					id="prompt"
					name="prompt"
					placeholder="A modern login form"
					defaultValue={prompt}
					minLength={2}
					maxLength={300}
				/>

				<label htmlFor="prompt">UI reference image URL</label>
				<input
					className="p-3 rounded-md border border-white/10 shadow-lg w-full"
					type="text"
					id="src"
					name="src"
					placeholder="URL"
					defaultValue={src}
					minLength={2}
					maxLength={300}
				/>
				{/* eslint-disable @next/next/no-img-element */}
				{src && (
					<img
						src={src}
						alt={prompt || ''}
						width={60}
						className="w-full rounded-md h-auto"
					/>
				)}
				{/* eslint-enable */}

				<ColorPicker max={5} multiple portal />

				<button type="submit" className="sr-only">
					Submit
				</button>
			</form>

			<GenerativeUI
				refetch={() => fetchUi({ prompt, src, colors })}
				prompt={prompt}
				src={src}
				content={content}
				isLoading={isLoading}
				isError={isError}
			/>
		</>
	)
}
