export interface RequestConfig<TBody = unknown>
	extends Omit<RequestInit, 'body'> {
	baseUrl?: string
	body?: TBody
}
