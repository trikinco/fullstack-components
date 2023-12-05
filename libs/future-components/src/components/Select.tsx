'use server'
import { useId, type HTMLAttributes, type ReactNode } from 'react'
import { merge } from '../utils/styles'
import { getSelect } from '../handlers/select/selectClient'
import type {
	SelectRequestOptions,
	SelectResponse,
} from '../handlers/select/models'

export interface SelectProps
	extends SelectRequestOptions,
		HTMLAttributes<HTMLSelectElement> {
	/** Visible label in the `<label>` element. Overrides any label from the response */
	label?: ReactNode
	/**
	 * Additional props to pass to the <label>
	 */
	labelProps?: HTMLAttributes<HTMLLabelElement>
}

export async function Select({
	prompt,
	context,
	purpose,
	count,
	className,
	labelProps,
	label: defaultLabel,
	...rest
}: SelectProps) {
	const selectId = useId()
	const response = await getSelect({ prompt, context, purpose, count })
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { label, content = [] }: SelectResponse = JSON.parse(
		response.responseText || ''
	)

	return (
		<>
			<label
				htmlFor={selectId}
				className={merge(
					'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
				)}
				{...labelProps}
			>
				{defaultLabel || label}
			</label>

			<select
				id={selectId}
				className={merge(
					'appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
					className
				)}
				defaultValue={content?.find(({ selected }) => selected)?.value}
				{...rest}
			>
				{content?.map(({ label, value }) => (
					<option value={value} key={value}>
						{label}
					</option>
				))}
			</select>
		</>
	)
}

export default Select
