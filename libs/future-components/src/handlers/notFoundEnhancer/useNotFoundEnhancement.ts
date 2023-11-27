'use client'

import type {
	NotFoundEnhancerResponse,
	NotFoundEnhancerRequestBody,
} from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const useNotFoundEnhancement = (
	/** Optional - `requestedUrl` default is `window.location.href`  */
	body?: NotFoundEnhancerRequestBody,
	config?: UseRequestConsumerConfig<NotFoundEnhancerRequestBody>
) => {
	return useRequest<NotFoundEnhancerResponse>(ApiUrlEnum.notFoundEnhancer, {
		body: {
			requestedUrl: typeof window !== 'undefined' && window.location.href,
			...body,
		},
		...config,
	})
}
