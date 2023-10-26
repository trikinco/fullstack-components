import { URL_HOST } from './constants'

export interface APIConfig<TBody = unknown> extends Omit<RequestInit, 'body'> {
	baseUrl?: string
	body?: TBody
}

export const request = async <TResponse, Tbody = unknown>(
	url: string,
	config: APIConfig<Tbody>
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
	} = config

	const response = await fetch(`${baseUrl}${url}`, {
		method,
		headers,
		body: JSON.stringify(body),
		...rest,
	})

	return (await response.json()) as TResponse
}
