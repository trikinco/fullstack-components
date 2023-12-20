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
}

/**
 * Fetch utility request options without the body.
 * @link RequestConfig
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
 */
export type RequestConfigOnly = Omit<RequestConfig, 'body'>
