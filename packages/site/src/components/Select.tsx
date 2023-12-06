'use client'

import { type HTMLAttributes, useId, useState } from 'react'
import type { SelectResponse } from '@trikinco/fullstack-components'
import { merge } from '@trikinco/fullstack-components/utils'

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
	data?: SelectResponse
}

/**
 * A custom Select
 * Not finalised with full a11y for usage, just use for visual demos atm
 */
export const Select = ({ data, className, ...rest }: SelectProps) => {
	const id = useId()
	const [isOpen, setIsOpen] = useState(false)
	const [selected, setSelected] = useState('')

	const handleSelect = (label: string) => {
		setSelected(label)
		setIsOpen(false)
	}

	return (
		<div className={merge('flex flex-col gap-2', className)} {...rest}>
			<button
				id={`${id}-button`}
				className="w-full text-black bg-white border border-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-6 h-12 inline-flex items-center justify-between"
				type="button"
				onClick={() => setIsOpen((isOpen) => !isOpen)}
			>
				{selected || data?.label}
				<svg
					className="w-2.5 h-2.5 ms-3 text-gray-400 ml-auto"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			</button>

			<div
				id={id}
				className={merge(
					'w-full z-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-xl overflow-hidden',
					!isOpen && 'hidden'
				)}
			>
				<ul
					className="flex flex-col p-0 m-0 text-black list-none"
					aria-labelledby={`${id}-button`}
				>
					{data?.content?.map((item) => (
						<li key={item.value} className="p-0 m-0 group">
							<button
								type="button"
								className="w-full flex items-center text-left p-2 group-first-of-type:pt-3 group-last-of-type:pb-3 hover:bg-gray-100"
								onClick={() => handleSelect(item.label)}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Select
