import type {
	NotFoundEnhancerResponse,
	NotFoundEnhancerRequestBody,
} from './models'
import { useRequest, type UseRequestConfig } from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const useNotFoundEnhancement = (
	config?: UseRequestConfig<NotFoundEnhancerRequestBody>
) => {
	return useRequest<NotFoundEnhancerResponse>(ApiUrlEnum.notFoundEnhancer, {
		...config,
		body: {
			requestedUrl: typeof window !== 'undefined' && window.location.href,
		},
	})
}
