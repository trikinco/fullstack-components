'use client'

import { useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { ColorPicker } from '@/src/components/ColorPicker/ColorPicker'
import { HTMLPage } from '@/src/modules/HTMLPage'
import { Button } from '@/src/components/Elements/Button'
import { IconLoader } from '@/src/components/Icons/IconLoader'
import { IconSparkles } from '@/src/components/Icons/IconSparkles'
import { Input } from '@/src/components/Elements/Input'
import { Label } from '@/src/components/Elements/Label'

interface FormBodyProps {
	state?: string
	refetch: () => void
}

export function FormBody({ state, refetch }: FormBodyProps) {
	const { pending, data } = useFormStatus()
	const [prompt, setPrompt] = useState('')
	const [src, setSrc] = useState('')

	useEffect(() => {
		const prompt = data?.get('prompt') as string
		const src = data?.get('src') as string

		if (prompt) {
			setPrompt(prompt)
		}

		if (src) {
			setSrc(src)
		}
	}, [data])

	return (
		<>
			<fieldset className="mb-10 mx-auto max-w-prose flex flex-col gap-6">
				<div>
					<Label htmlFor="prompt">What would you like to create?</Label>
					<Input
						id="prompt"
						name="prompt"
						placeholder="A modern login form..."
						minLength={2}
						maxLength={300}
					/>
				</div>

				<div className="flex gap-3 items-center">
					<div className="grow">
						<Label htmlFor="src">Reference image URL</Label>
						<Input
							id="src"
							name="src"
							placeholder="URL"
							minLength={2}
							maxLength={300}
						/>
					</div>

					{/* eslint-disable @next/next/no-img-element */}
					{src && (
						<img
							src={src}
							alt={prompt || ''}
							width={60}
							className="rounded-md h-auto w-32"
						/>
					)}
					{/* eslint-enable */}
				</div>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
					<ColorPicker max={5} multiple portal />

					<Button type="submit" disabled={pending} className="ml-auto">
						{pending ? (
							<>
								Creating page <IconLoader className="ml-2" />
							</>
						) : (
							<>
								Create page <IconSparkles className="ml-2" />
							</>
						)}
					</Button>
				</div>
			</fieldset>

			<HTMLPage
				refetch={refetch}
				prompt={prompt}
				src={src}
				data={state}
				isLoading={pending}
			/>
		</>
	)
}

export default FormBody
