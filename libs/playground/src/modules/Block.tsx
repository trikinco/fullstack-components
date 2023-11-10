'use client'

import { memo, useId, useRef, useEffect, type HTMLAttributes } from 'react'
import { request } from '@fullstack-components/ai-components/client'
import { Spinner } from '../components/Spinner'

export interface BlockProps extends HTMLAttributes<HTMLElement> {
	prompt: string
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
 * - nicer loading states
 */
export const Block = memo(function Block({ prompt, ...props }: BlockProps) {
	const id = useId()
	// Just for avoiding multiple API calls in strict mode - this isn't really needed
	const isEnabled = useRef(true)

	useEffect(() => {
		const loadContent = async () => {
			try {
				const response = request<{ result: string }>('/api/ui/component', {
					body: { prompt },
				})
				// @ts-ignore Cannot find module 'https://esm.sh/build' or its corresponding type declarations.
				const build = import(/* webpackIgnore: true */ 'https://esm.sh/build')

				const { result } = (await response) || {}
				const { esm } = await build
				const { content, usage } = JSON.parse(result.replace(/\r?\n|\r/g, ' ')) // remove newlines - it can mess with SVG's and other markup

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
	}, [])

	return (
		<div id={id} {...props}>
			<Spinner className="flex gap-3 p-3 items-center" classNameSpinner="mb-0">
				Creating &quot;{prompt}&quot;...
			</Spinner>
		</div>
	)
})
