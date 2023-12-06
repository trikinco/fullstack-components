export interface RequestConfig<TBody = unknown>
	extends Omit<RequestInit, 'body'> {
	baseUrl?: string
	body?: TBody
}

export type RequestConfigOnly = Omit<RequestConfig, 'body'>
