import { useId, type HTMLAttributes, type ReactNode } from 'react'
import { merge } from '../utils/styles'
import { getSelect } from '../handlers/select/selectClient'
import type { SelectResponse } from '../handlers/select/models'

export type { SelectRequestBody } from '../handlers/select/models'

/**
 * Props to pass to the `<Select>` Server Component.
 * @extends HTMLAttributes<HTMLSelectElement>
 */
export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
	/**
	 * A text description for creating the dropdown.
	 * @example 'All the GMT time zones'
	 */
	prompt: string
	/**
	 * A text description of the purpose of the dropdown.
	 * @example 'Selecting your time zone'
	 */
	purpose?: string
	/**
	 * A text description of additional context or information to help create the dropdown.
	 * @example 'The time zone for Sydney should be selected'
	 */
	context?: string
	/**
	 * The number of dropdown options or list items to create.
	 * @example 10
	 */
	count?: number
	/**
	 * Visible text in the `<label>` element. Overrides any generated `label` from the response.
	 */
	label?: ReactNode
	/**
	 * Additional props to pass to the `<label>` element.
	 */
	labelProps?: HTMLAttributes<HTMLLabelElement>
}

/**
 * Select is a smart Server Component for dropdowns that creates, labels and sorts all its own options.
 * Uses a native `<select>` element.
 * @extends HTMLAttributes<HTMLSelectElement>
 */
export async function Select(
	/**
	 * @link SelectProps
	 */
	props: SelectProps
) {
	const {
		prompt,
		context,
		purpose,
		count,
		className,
		labelProps,
		label: defaultLabel,
		...rest
	} = props || {}
	const { className: labelClassName, ...labelRest } = labelProps || {}
	const selectId = useId()
	const response = await getSelect({ prompt, context, purpose, count })
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { label, content = [] }: SelectResponse = JSON.parse(
		response.responseText || '{}'
	)

	return (
		<>
			<label
				htmlFor={selectId}
				className={merge(
					'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
					labelClassName
				)}
				{...labelRest}
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
