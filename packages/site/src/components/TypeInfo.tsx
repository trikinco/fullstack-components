import type { HTMLAttributes, ReactNode } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'
import { IconMenuAlt } from './Icons/IconMenuAlt'

export interface TypeInfoDetails {
	/**
	 * Name of the type or interface to extract.
	 * Needed to extract a single type from a .ts/x file
	 * @example
	 * 'ButtonProps'
	 */
	name: string
	/**
	 * The type name
	 */
	type: string
	/**
	 * Whether the type is required or not
	 */
	required: boolean
	/**
	 * Description to override the top level type description
	 */
	description?: ReactNode
}

export interface TypeInfoProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
		TypeInfoDetails {
	/**
	 * Children to show after the description
	 */
	children?: ReactNode
	/**
	 * Parameters of complex types
	 */
	parameters?: TypeInfoDetails[]
}

export const TypeInfo = ({
	name,
	type,
	required,
	description,
	parameters,
	children,
	className,
	...rest
}: TypeInfoProps) => {
	return (
		<div
			className={merge(
				'flex flex-col gap-2 py-6 border-t border-slate-200 dark:border-slate-800',
				className
			)}
			{...rest}
		>
			<p className="flex gap-2 m-0">
				<span className="font-bold">{name}</span>
				<span className="text-sm font-mono my-auto text-slate-500">{type}</span>
				{required && (
					<span className="text-sm font-mono my-auto text-red-600">
						required
					</span>
				)}
			</p>
			{description && (
				<span
					className="whitespace-pre-wrap [&>*]:m-0"
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			)}
			{parameters && parameters.length > 0 && (
				<details>
					<summary className="[&::marker]:content-none flex gap-2 mt-3 cursor-pointer text-sm text-slate-500 hover:text-black dark:hover:text-slate-600">
						<IconMenuAlt width={20} height={20} /> Parameters
					</summary>

					<div className="mt-3 border rounded-md border-slate-200 dark:border-slate-800">
						{parameters.map((param) => (
							<TypeInfo
								key={param.name}
								className="p-6 first-of-type:border-t-0"
								{...param}
							/>
						))}
					</div>
				</details>
			)}
			{children}
		</div>
	)
}
