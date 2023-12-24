/**
 * Fetch utility request options.
 * @extends RequestInit fetch options
 */
export interface RequestConfig<TBody = unknown>
	extends Omit<RequestInit, 'body'> {
	/**
	 * The base URL to use for the request.
	 */
	baseUrl?: string
	/**
	 * The fetch request body.
	 */
	body?: TBody
	/**
	 * Request response parsing type.
	 * `blob` returns a blob URL.
	 * @default 'json'
	 */
	responseType?: 'json' | 'blob'
}

/**
 * Fetch utility request options without the body.
 * @link RequestConfig
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
 */
export type RequestConfigOnly = Omit<RequestConfig, 'body'>
