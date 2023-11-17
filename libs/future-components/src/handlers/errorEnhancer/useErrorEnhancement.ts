import { useRequest, type UseRequestConfig } from '../../hooks/useRequest'
import { ErrorEnhancementRequestBody, ErrorEnhancementResponse } from './models'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const useErrorEnhancement = (
	errorContext: ErrorEnhancementRequestBody,
	config?: UseRequestConfig<ErrorEnhancementRequestBody>
) => {
	return useRequest<ErrorEnhancementResponse>(ApiUrlEnum.errorEnhancer, {
		...config,
		body: errorContext,
	})
}
