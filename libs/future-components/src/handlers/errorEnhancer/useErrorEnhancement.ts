import { useRequest, type UseRequestConfig } from '../../hooks/useRequest'
import { ErrorEnhancementRequestBody, ErrorEnhancementResponse } from './models'

export const useErrorEnhancement = (
	errorContext: ErrorEnhancementRequestBody,
	config?: UseRequestConfig<ErrorEnhancementRequestBody>
) => {
	return useRequest<ErrorEnhancementResponse>('/api/fsutils/errorEnhancer', {
		...config,
		body: errorContext,
	})
}
