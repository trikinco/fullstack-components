'use client'
import { Children, forwardRef, useImperativeHandle } from 'react'
import type { HTMLAttributes, ElementType } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'
import { useText } from '../hooks/useText'
import type { RewriteOptions } from '../types/Text'

export interface TextRewriteProps
	extends RewriteOptions,
		Omit<HTMLAttributes<HTMLElement>, 'children'> {
	component?: ElementType
	/** The active version. Default 0 */
	value?: number
	/** refetches text */
	refetch?: () => void
}

/**
 * A smart component that rewrites the text within.
 */
export const TextRewrite = forwardRef(function TextRewrite(
	{
		refetch,
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
	}: TextRewriteProps,
	ref
) {
	const WrapperComponent = component || 'div'
	const options = { children, count, tone, strength, grade, max, min }
	const { isLoading, content, fetchText } = useText(options)

	// Expose a handle to its parent
	useImperativeHandle(ref, () => ({
		refetch() {
			fetchText(options)
		},
	}))

	if (!isLoading && content?.content) {
		return (
			<WrapperComponent
				ref={ref}
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
				ref={ref}
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
})
