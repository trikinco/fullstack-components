'use client'

import { useRef, type HTMLAttributes } from 'react'
import { useFormState } from 'react-dom'
import { merge } from '@trikinco/fullstack-components/utils'
import { generateHtmlPage } from './action'
import { FormBody } from './FormBody'

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
		>
			<FormBody state={state} refetch={refetch} />
		</form>
	)
}

export default Form
