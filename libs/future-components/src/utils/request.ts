import { URL_HOST } from './constants'

export interface RequestConfig<TBody = unknown>
	extends Omit<RequestInit, 'body'> {
	baseUrl?: string
	body?: TBody
}

export const request = async <TResponse = unknown, Tbody = unknown>(
	/** Relative API url */
	url: string,
	/** Fetch request config initialiser in addition to the `baseUrl` */
	config?: RequestConfig<Tbody>
): Promise<TResponse> => {
	const {
		baseUrl = URL_HOST,
		body,
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

	return (await response.json()) as TResponse
}
