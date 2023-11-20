'use client'

import {
	memo,
	useId,
	useRef,
	useEffect,
	type HTMLAttributes,
	type ReactNode,
} from 'react'
import {
	ErrorBoundary,
	useErrorBoundary,
	type ErrorBoundaryPropsWithFallback,
} from 'react-error-boundary'
import { request } from '../utils/request'
import ApiUrlEnum from '../enums/ApiUrlEnum'

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
	const id = useId()
	// Just for avoiding multiple API calls in strict mode - this isn't really needed
	const isEnabled = useRef(true)
	const { showBoundary } = useErrorBoundary()

	useEffect(() => {
		const loadContent = async () => {
			try {
				const response = request<any>(ApiUrlEnum.block, {
					body: { prompt },
				})
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore Cannot find module 'https://esm.sh/build' or its corresponding type declarations.
				const build = import(/* webpackIgnore: true */ 'https://esm.sh/build')

				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const result: string = (await response) || {}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const { esm } = await build
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const { content, usage } = JSON.parse(
					result.replaceAll(/\r?\n|\r/g, ' ')
				) // remove newlines - it can mess with SVG's and other markup

				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				await esm`
				/* @jsx */
				import React from 'https://esm.sh/react';
				import { createRoot } from 'https://esm.sh/react-dom/client?exports=createRoot';

				${content}

				createRoot(document.getElementById('${id}'),
					// Ensure there are no clashes if we have multiple roots using 'useId'
					{ identifierPrefix: '${id}' }).render(
					<React.StrictMode>
						${usage}
					</React.StrictMode>
				)
				`
			} catch (error) {
				console.error('something went wrong when loading block content', error)

				showBoundary(error)
			}
		}

		if (isEnabled.current) {
			isEnabled.current = false
			void loadContent()
		}

		return () => {
			isEnabled.current = false
		}
	}, [id, prompt])

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
