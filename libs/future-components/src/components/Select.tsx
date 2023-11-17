import { useId, type HTMLAttributes } from 'react'
import { merge } from '../utils/styles'
import { request } from '../utils/request'
import { ApiUrlEnum } from '../enums/ApiUrlEnum'

export interface SelectOptions {
	/**
	 * Additional context to pass to the prompt. Free text
	 */
	context?: string
	/**
	 * @example 'selecting your time zone'
	 * @example 'weekday selection'
	 */
	purpose: string
	/**
	 * The number of items to aim for
	 */
	count?: number
}

export interface SelectProps
	extends SelectOptions,
		HTMLAttributes<HTMLSelectElement> {
	/**
	 * Additional props to pass to the <label>
	 */
	labelProps?: HTMLAttributes<HTMLLabelElement>
}

export interface SelectItem {
	value: string
	label: string
	selected?: true
}

/**
 * Select generation fetcher
 */
export function getSelect(props: SelectOptions) {
	const { purpose, context, count } = props || {}
	const body = { purpose, context, count }

	return request<{
		label: string
		content: SelectItem[]
	}>(ApiUrlEnum.select, { body })
}

export async function Select({
	purpose,
	context,
	count = 0,
	className,
	labelProps,
	...rest
}: SelectProps) {
	const selectId = useId()

	const { label, content } =
		(await getSelect({ purpose, context, count })) || {}

	if (!label || !content) {
		// eslint-disable-next-line unicorn/no-null
		return null
	}

	return (
		<>
			<label
				htmlFor={selectId}
				className={merge(
					'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
				)}
				{...labelProps}
			>
				{label}
			</label>

			<select
				id={selectId}
				className={merge(
					'appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
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
