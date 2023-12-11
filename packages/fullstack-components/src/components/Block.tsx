'use client'

import { memo, type HTMLAttributes, type ReactNode } from 'react'
import {
	ErrorBoundary,
	useErrorBoundary,
	type ErrorBoundaryPropsWithFallback,
} from 'react-error-boundary'
import { useBlock } from '../handlers/block/useBlock'

/**
 * A Block is a React component that is generated and mounted dynamically.
 * @extends `HTMLAttributes<HTMLElement>`
 */
export interface BlockProps extends HTMLAttributes<HTMLElement> {
	/** A text description of the desired component. */
	prompt: string
	/**
	 * A React tree to render in the error boundary if the `<Block>` build or renderer fails.
	 * @see `react-error-boundary` for full type information.
	 */
	fallback?: ErrorBoundaryPropsWithFallback['fallback']
	/** A React tree to render in the target root before rendering the `<Block>`. */
	loading?: ReactNode
	/**
	 * Props to pass to the wrapping error boundary.
	 * @see `react-error-boundary` for full type information.
	 */
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
	const { showBoundary } = useErrorBoundary()
	const { id } = useBlock(prompt, showBoundary)

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
