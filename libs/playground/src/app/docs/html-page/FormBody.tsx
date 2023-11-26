'use client'

import { useFormStatus } from 'react-dom'
import { ColorPicker } from '@/src/components/ColorPicker/ColorPicker'
import { HTMLPage } from '@/src/modules/HTMLPage'
import { Button } from '@/src/components/Button'

interface FormBodyProps {
	state?: string
	refetch: () => void
}

export function FormBody({ state, refetch }: FormBodyProps) {
	const { pending, data } = useFormStatus()

	const prompt = data?.get('prompt') as string
	const src = data?.get('src') as string

	return (
		<>
			<fieldset className="mb-10 mx-auto max-w-prose flex flex-col gap-6">
				<div>
					<label
						htmlFor="prompt"
						className="block mb-2 font-bold dark:text-white"
					>
						What would you like to make?
					</label>
					<input
						className="p-3 rounded-md border border-white/10 w-full"
						type="text"
						id="prompt"
						name="prompt"
						placeholder="A modern login form..."
						minLength={2}
						maxLength={300}
					/>
				</div>

				<div className="flex gap-3 items-center">
					<div className="grow">
						<label
							htmlFor="src"
							className="block mb-2 font-bold dark:text-white"
						>
							Reference image URL
						</label>
						<input
							className="p-3 rounded-md border border-white/10 w-full"
							type="text"
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
						{pending ? 'Creating page ✨' : 'Create page'}
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
