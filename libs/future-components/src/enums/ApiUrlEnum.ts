export const ApiUrlEnum = {
	prompt: '/api/fsutils/prompt',
	errorEnhancer: '/api/fsutils/errorEnhancer',
	notFoundEnhancer: '/api/fsutils/notFoundEnhancer',
	select: '/api/fsutils/select',
	imageDescribe: '/api/fsutils/imageDescribe',
	imageGenerate: '/api/fsutils/imageGenerate',
	block: '/api/fsutils/block',
} as const

export default ApiUrlEnum
