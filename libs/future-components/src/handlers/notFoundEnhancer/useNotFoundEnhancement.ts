import type {
	NotFoundEnhancerResponse,
	NotFoundEnhancerRequestBody,
} from './notFoundEnhancer'
import { useRequest, type UseRequestConfig } from '../../hooks/useRequest'

export const useNotFoundEnhancement = (
	config?: UseRequestConfig<NotFoundEnhancerRequestBody>
) => {
	return useRequest<NotFoundEnhancerResponse>(
		'/api/fsutils/not-found-enhancer',
		{
			...config,
			body: {
				requestedUrl: typeof window !== 'undefined' && window.location.href,
			},
		}
	)
}
