'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { ColorPicker } from '@/src/components/ColorPicker/ColorPicker'
import { HTMLPage } from '@/src/modules/HTMLPage'
import { Button } from '@/src/components/Elements/Button'
import { IconLoader } from '@/src/components/Icons/IconLoader'
import { IconSparkles } from '@/src/components/Icons/IconSparkles'
import { Input } from '@/src/components/Elements/Input'
import { Label } from '@/src/components/Elements/Label'

interface FormBodyProps {
	/** The gen HTML content to preview in an iframe */
	state?: string | null
	/** Refetch gen HTML with current form values */
	refetch: () => void
}

export function FormBody({ state, refetch }: FormBodyProps) {
	const { pending } = useFormStatus()
	// This is just for the preview messages and chips
	const [prompt, setPrompt] = useState('')
	const [src, setSrc] = useState('')
	const [colors, setColors] = useState('')

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
						onChange={(e) => setPrompt(e.target.value)}
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
							onChange={(e) => setSrc(e.target.value)}
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

				<div className="flex flex-col gap-6 sm:flex-row sm:items-center">
					<ColorPicker
						onChange={(values) => setColors(values as string)}
						max={5}
						multiple
						portal
					/>

					<Button type="submit" disabled={pending} className="ml-auto">
						{pending ? (
							<>
								Creating page{' '}
								<IconLoader className="ml-2" width={20} height={20} />
							</>
						) : (
							<>
								Create page{' '}
								<IconSparkles className="ml-2" width={20} height={20} />
							</>
						)}
					</Button>
				</div>
			</fieldset>

			<HTMLPage
				refetch={refetch}
				prompt={prompt}
				colors={colors}
				src={src}
				state={state}
				isLoading={pending}
			/>
		</>
	)
}

export default FormBody
