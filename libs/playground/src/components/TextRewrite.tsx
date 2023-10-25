'use client'
import { Children } from 'react'
import type { HTMLAttributes, ElementType } from 'react'
import { merge } from '../utils/styles'
import { useText } from '../hooks/useText'
import type { RewriteOptions } from '../models/Text'

export interface TextRewriteProps
	extends RewriteOptions,
		Omit<HTMLAttributes<HTMLElement>, 'children'> {
	component?: ElementType
	/** The active version. Default 0 */
	value?: number
}

/**
 * A smart component that rewrites the text within.
 */
export const TextRewrite = ({
	value = 0,
	children,
	component,
	className,
	// Rewrite options
	count = 1,
	tone,
	strength,
	grade,
	max,
	min,
	// HTML props and rest
	...rest
}: TextRewriteProps) => {
	const WrapperComponent = component || 'div'
	const { content } = useText({
		children,
		count,
		tone,
		strength,
		grade,
		max,
		min,
	})

	if (content?.content) {
		return (
			<WrapperComponent
				dangerouslySetInnerHTML={{
					__html: content ? content.content[value] : null,
				}}
				className={merge('w-full', className)}
				{...rest}
			/>
		)
	} else {
		// Show a loading state up-front and during processing
		return (
			<WrapperComponent
				className={merge('w-full animate-pulse', className)}
				{...rest}
			>
				{Children.map(children, (_child, i) => (
					<div
						className={`${
							i % 2 ? 'w-10/12' : 'w-11/12'
						} h-4 mb-3 bg-gray-200 rounded-md dark:bg-gray-700`}
					/>
				))}
			</WrapperComponent>
		)
	}
}
