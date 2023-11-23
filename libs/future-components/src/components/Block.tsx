'use client'

import { memo, type HTMLAttributes, type ReactNode } from 'react'
import {
	ErrorBoundary,
	type ErrorBoundaryPropsWithFallback,
} from 'react-error-boundary'
import { useBlock } from '../handlers/block/useBlock'

export interface BlockProps extends HTMLAttributes<HTMLElement> {
	prompt: string
	/** a react tree to render in the error boundary if the Block build or renderer fails */
	fallback?: ErrorBoundaryPropsWithFallback['fallback']
	/** a react tree to render in the root before rendering the Block */
	loading?: ReactNode
	/** props to pass to the wrapping error boundary */
	errorBoundaryProps?: Omit<ErrorBoundaryPropsWithFallback, 'fallback'>
}

export type BlockRendererProps = Omit<
	BlockProps,
	'fallback' | 'errorBoundaryProps'
>

/**
 * BlockRenderer renders any UI React component based on a prompt
 */
export const BlockRenderer = memo(function BlockRenderer({
	prompt,
	loading,
	...props
}: BlockRendererProps) {
	const { id } = useBlock(prompt)

	return (
		<div id={id} {...props}>
			{loading}
		</div>
	)
})

/**
 * Block renders any UI React component based on a prompt
 * This block is wrapped in an ErrorBoundary
 */
export const Block = ({
	prompt,
	fallback,
	errorBoundaryProps,
	...props
}: BlockProps) => {
	const fallbackTree = fallback || (
		<>Something went wrong when generating "{prompt}"</>
	)
	return (
		<ErrorBoundary fallback={fallbackTree} {...errorBoundaryProps}>
			<BlockRenderer prompt={prompt} {...props} />
		</ErrorBoundary>
	)
}

export default Block
