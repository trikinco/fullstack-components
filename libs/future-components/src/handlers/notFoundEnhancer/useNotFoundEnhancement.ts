import type {
	NotFoundEnhancerResponse,
	NotFoundEnhancerRequestBody,
} from './models'
import { useRequest, type UseRequestConfig } from '../../hooks/useRequest'

export const useNotFoundEnhancement = (
	config?: UseRequestConfig<NotFoundEnhancerRequestBody>
) => {
	return useRequest<NotFoundEnhancerResponse>('/api/fsutils/notFoundEnhancer', {
		...config,
		body: {
			requestedUrl: typeof window !== 'undefined' && window.location.href,
		},
	})
}
