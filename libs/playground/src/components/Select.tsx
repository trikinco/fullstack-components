import { useId, type HTMLAttributes } from 'react'
import { merge } from '../utils/styles'
import { URL_DEPLOYMENT } from '../utils/constants'

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
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

export const Select = async ({
	purpose,
	context,
	count = 0,
	className,
	labelProps,
	...rest
}: SelectProps) => {
	const selectId = useId()

	async function fetchSelect(options: SelectProps): Promise<{
		label: string
		content: SelectItem[]
	} | null> {
		try {
			const response = await fetch(`${URL_DEPLOYMENT}/api/select`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(options),
			})

			const data = await response.json()

			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				)
			}

			return JSON.parse(data.result || {})
		} catch (error) {
			console.error(error)

			return null
		}
	}

	const { label, content } =
		(await fetchSelect({ purpose, context, count })) || {}

	if (!label || !content) {
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
