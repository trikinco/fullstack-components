'use client'

import {
	memo,
	useId,
	useRef,
	useEffect,
	type HTMLAttributes,
	ReactNode,
} from 'react'
import { request } from '../utils/request'

export interface BlockProps extends HTMLAttributes<HTMLElement> {
	prompt: string
	/** A fallback react tree to show when the component is building, e.g a loading state */
	fallback?: ReactNode
}

/**
 * Block renders any UI React component based on a prompt
 *
 * This could likely become a server component with some of the following changes:
 * - enabling experimental URL imports
    experimental: {
		urlImports: ['https://esm.sh/'],
	},
 * - this may also require package.json script changes
 * "dev": "NODE_OPTIONS='--experimental-network-imports' next dev",
 * - changing `createRoot(document.getElementById('${id}')...` with piping and hydrating
 * 
 * TODO - Handle: 
 * - errors
 * - tailwind css injection, 
 * - caching, 
 * = server component, 
 */
export const Block = memo(function Block({
	prompt,
	fallback,
	...props
}: BlockProps) {
	const id = useId()
	// Just for avoiding multiple API calls in strict mode - this isn't really needed
	const isEnabled = useRef(true)

	useEffect(() => {
		const loadContent = async () => {
			try {
				const response = request<{ result: string }>('/api/ui/component', {
					body: { prompt },
				})
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore Cannot find module 'https://esm.sh/build' or its corresponding type declarations.
				const build = import(/* webpackIgnore: true */ 'https://esm.sh/build')

				const { result } = (await response) || {}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const { esm } = await build
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const { content, usage } = JSON.parse(
					result.replaceAll(/\r?\n|\r/g, ' ')
				) // remove newlines - it can mess with SVG's and other markup

				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				esm`
				/* @jsx */
				import React from 'https://esm.sh/react';
				import { createRoot } from 'https://esm.sh/react-dom?exports=createRoot';

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
			{fallback}
		</div>
	)
})
