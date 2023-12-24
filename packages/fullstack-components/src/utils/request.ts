import { URL_HOST } from './constants'
import type { RequestConfig } from '../types'
export type { RequestConfig, RequestConfigOnly } from '../types'

/**
 * Fetch utility for calling internal Next.js API route handlers.
 * Destructures the `body` from the `RequestConfig` and stringifies it.
 */
export const request = async <TResponse = unknown, Tbody = unknown>(
	/**
	 * Relative API url
	 */
	url: string,
	/**
	 * Fetch request config initialiser in addition to the `baseUrl`
	 * @link RequestConfig
	 */
	config?: RequestConfig<Tbody>
): Promise<TResponse> => {
	const {
		baseUrl = URL_HOST,
		body,
		responseType = 'json',
		method = 'POST',
		headers = {
			//eslint-disable-next-line @typescript-eslint/naming-convention
			'Content-Type': 'application/json',
		},
		...rest
	} = config || {}

	const response = await fetch(`${baseUrl}${url}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
		...rest,
	})

	if (responseType === 'blob') {
		const blob = await response.blob()
		return URL.createObjectURL(blob) as unknown as TResponse
	}

	return (await response.json()) as TResponse
}
