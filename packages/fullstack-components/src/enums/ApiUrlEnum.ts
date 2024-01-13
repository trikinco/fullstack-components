/**
 * All the API URLs used by fetchers, hooks and client components.
 */
export const ApiUrlEnum = {
	prompt: '/api/fsutils/prompt',
	errorEnhancer: '/api/fsutils/errorEnhancer',
	notFoundEnhancer: '/api/fsutils/notFoundEnhancer',
	htmlPage: '/api/fsutils/htmlPage',
	select: '/api/fsutils/select',
	image: '/api/fsutils/image',
	block: '/api/fsutils/block',
	text: '/api/fsutils/text',
	audio: '/api/fsutils/audio',
} as const

export default ApiUrlEnum
