'use client'

import { useRef, type HTMLAttributes } from 'react'
import { useFormState } from 'react-dom'
import { merge } from '../../../../../fullstack-components/dist/utils'
import { generateHtmlPage } from './action'
import { FormBody } from './FormBody'

export function Form({ className }: HTMLAttributes<HTMLFormElement>) {
	const [state, formAction] = useFormState(generateHtmlPage, null)
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
