'use client'

import { useRef, type HTMLAttributes } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { merge } from '@trikinco/fullstack-components/utils'
import { generateHtmlPage } from '@/src/app/docs/html-page-generator/action'
import { Button } from '@/src/components/Elements/Button'
import { Input } from '@/src/components/Elements/Input'
import { Label } from '@/src/components/Elements/Label'

interface FormBodyProps {
	state?: string
	refetch: () => void
}

export function FormBody({ state }: FormBodyProps) {
	const { data } = useFormStatus()

	const prompt = data?.get('prompt') as string
	const src = data?.get('src') as string
	const showForm = !state

	return (
		<>
			<iframe
				id="preview"
				title={prompt || src}
				sandbox="allow-same-origin allow-scripts allow-modals allow-popups allow-presentation allow-downloads allow-pointer-lock"
				className="absolute top-0 left-0 w-full h-full border-0 min-h-0 overflow-auto opacity-100 select-auto pointer-events-auto"
				srcDoc={state}
			/>

			{showForm && (
				<fieldset className="m-auto flex flex-col gap-6 items-center relative z-20">
					{!prompt ? (
						<div>
							<Label
								htmlFor="prompt"
								className="mb-3 text-lg font-normal dark:text-black"
							>
								What do you want to create? ✨
							</Label>
							<Input
								className="border border-gray-200 dark:bg-white dark:text-black"
								id="prompt"
								name="prompt"
								placeholder="A modern login form..."
								minLength={2}
								maxLength={300}
							/>
						</div>
					) : (
						<div className="text-lg text-black animate-bounce">
							Creating {prompt.toLowerCase()} ✨
						</div>
					)}

					<Button type="submit" className="sr-only">
						Create page
					</Button>
				</fieldset>
			)}
		</>
	)
}

export function Form({ className }: HTMLAttributes<HTMLFormElement>) {
	const [state, formAction] = useFormState(generateHtmlPage, '')
	const formRef = useRef<HTMLFormElement>(null)

	const refetch = () => {
		if (!formRef.current) return

		formRef.current.requestSubmit()
	}

	return (
		<form
			ref={formRef}
			action={formAction}
			className={merge('my-3', className)}
			autoComplete="off"
		>
			<FormBody state={state} refetch={refetch} />
		</form>
	)
}

export default Form
