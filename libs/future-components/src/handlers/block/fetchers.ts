'use client'
import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { BlockRequestBody, BlockResponse, BlockResult } from './models'

/**
 * Block generation fetcher
 */
export async function fetchBlock(
	body: BlockRequestBody,
	config?: RequestConfigOnly
) {
	return request<BlockResponse>(ApiUrlEnum.block, {
		body,
		...config,
	})
}

/**
 * Block generation and build processing fetcher
 * 'use client'
 */
export async function fetchProcessedBlock(
	props: BlockRequestBody & { id: string },
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
