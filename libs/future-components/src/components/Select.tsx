import { useId, type HTMLAttributes, type ReactNode } from 'react'
import { merge } from '../utils/styles'
import { request } from '../utils/request'
import { ApiUrlEnum } from '../enums/ApiUrlEnum'
import { SelectResponse, SelectRequestBody } from '../handlers/select/models'

export type SelectOptions = Omit<SelectRequestBody, 'prompt'> &
	Required<Pick<SelectRequestBody, 'prompt'>>

export interface SelectProps
	extends SelectOptions,
		HTMLAttributes<HTMLSelectElement> {
	/** Visible label in the `<label>` element. Overrides any label from the response */
	label?: ReactNode
	/**
	 * Additional props to pass to the <label>
	 */
	labelProps?: HTMLAttributes<HTMLLabelElement>
}

/**
 * Select generation fetcher
 */
export function getSelect(props: SelectOptions) {
	const { prompt, context, count } = props || {}
	const body = { prompt, context, count }

	return request<SelectResponse>(ApiUrlEnum.select, { body })
}

export async function Select({
	prompt,
	context,
	count = 0,
	className,
	labelProps,
	label: defaultLabel,
	...rest
}: SelectProps) {
	const selectId = useId()

	const { label, content = [] } =
		(await getSelect({ prompt, context, count })) || {}
	const selectLabel = defaultLabel || label

	return (
		<>
			<label
				htmlFor={selectId}
				className={merge(
					'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
				)}
				{...labelProps}
			>
				{selectLabel}
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
