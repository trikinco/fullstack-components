'use client'

import { memo, type HTMLAttributes, type ReactNode } from 'react'
import {
	ErrorBoundary,
	useErrorBoundary,
	type ErrorBoundaryPropsWithFallback,
} from 'react-error-boundary'
import { useBlock } from '../handlers/block/useBlock'

/**
 * Props to pass to the `<Block>` Client Component.
 * @extends HTMLAttributes<HTMLElement>
 */
export interface BlockProps extends HTMLAttributes<HTMLElement> {
	/**
	 * A text description of the desired component.
	 * @example 'A footer with copyright for this year with the company name Acme'
	 */
	prompt: string
	/**
	 * A React tree to render in the error boundary if the `<Block>` build or renderer fails.
	 * @link https://www.npmjs.com/package/react-error-boundary `react-error-boundary` for full type information.
	 */
	fallback?: ErrorBoundaryPropsWithFallback['fallback']
	/** A React tree to render in the target root before rendering the `<Block>`. */
	loading?: ReactNode
	/**
	 * Props to pass to the wrapping error boundary.
	 * @link https://www.npmjs.com/package/react-error-boundary `react-error-boundary` for full type information.
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
export const BlockRenderer = memo(function BlockRenderer(
	/**
	 * @link BlockRendererProps
	 */
	props: BlockRendererProps
) {
	const { prompt, loading, ...rest } = props || {}
	const { showBoundary } = useErrorBoundary()
	const { id } = useBlock(prompt, showBoundary)

	return (
		<div id={id} {...rest}>
			{loading}
		</div>
	)
})

/**
 * Block is a client component that renders a generated React component based on a `prompt`.
 * @note Each `<Block>` is wrapped in an `ErrorBoundary` to catch any errors thrown during the build or render process.
 */
export function Block(
	/**
	 * @link BlockProps
	 */
	props: BlockProps
) {
	const { prompt, fallback, errorBoundaryProps, ...rest } = props || {}
	const fallbackTree = fallback || (
		<>Something went wrong when generating "{prompt}"</>
	)
	return (
		<ErrorBoundary fallback={fallbackTree} {...errorBoundaryProps}>
			<BlockRenderer prompt={prompt} {...rest} />
		</ErrorBoundary>
	)
}
