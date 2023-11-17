export const ApiUrlEnum = {
	prompt: '/api/fsutils/prompt',
	errorEnhancer: '/api/fsutils/errorEnhancer',
	notFoundEnhancer: '/api/fsutils/notFoundEnhancer',
	select: '/api/fsutils/select',
	uiBlock: '/api/fsutils/uiBlock',
	imageDescribe: '/api/fsutils/imageDescribe',
	imageGenerate: '/api/fsutils/imageGenerate',
} as const

export default ApiUrlEnum
