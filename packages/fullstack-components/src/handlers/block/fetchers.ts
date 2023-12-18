'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { BlockRequestBody, BlockResponse, BlockResult } from './models'

/**
 * Generates code for a React component based on the provided `BlockRequestBody`.
 *
 * Block client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.block`
 * @returns {Promise<BlockResponse>} Stringified JSON response
 */
export async function fetchBlock(
	/**
	 * @link BlockRequestBody
	 */
	body: BlockRequestBody,
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
) {
	return request<BlockResponse>(ApiUrlEnum.block, {
		body,
		...config,
	})
}

/**
 * Generates the code for a React component based on the provided `BlockRequestBody` and processes the response then mounts the component in the DOM element with the specified `id`.
 * Uses `fetchBlock` under the hood to generate and fetch the block, then uses `esm.sh/build` to process the response and mount the component.
 *
 * Block client-side fetch handler that calls the internal Next.js API route handler, then the third-party API. Best used for Client Components and functionality.
 * @see `ApiUrlEnum.block`
 * @returns {Promise<BlockResult>} JSON response
 */
export async function fetchProcessedBlock(
	/**
	 * @link BlockRequestBody
	 * @property {string} id Unique id to assign to a browser DOM element to mount the component in.
	 */
	props: BlockRequestBody & { id: string },
	/**
	 * Fetch utility request options without the `body`
	 * @link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
	 */
	config?: RequestConfigOnly
): Promise<BlockResult> {
	const { id, ...body } = props
	const response = fetchBlock(body, config)

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore Cannot find module 'https://esm.sh/build' or its corresponding type declarations.
	const build = import(/* webpackIgnore: true */ 'https://esm.sh/build')
	const result = (await response) || ''

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { esm } = await build
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { content, usage }: BlockResult = JSON.parse(
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

	return { content, usage }
}
