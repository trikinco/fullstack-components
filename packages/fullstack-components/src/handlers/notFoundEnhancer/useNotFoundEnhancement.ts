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

/**
 * Not found enhancer client hook
 */
export interface UseNotFoundEnhancementParameters {
	/**
	 * `requestedUrl`
	 * @default `window.location.href`
	 */
	body?: NotFoundEnhancerRequestBody
	config?: UseRequestConsumerConfig<NotFoundEnhancerRequestBody>
}

export const useNotFoundEnhancement = (
	body?: UseNotFoundEnhancementParameters['body'],
	config?: UseNotFoundEnhancementParameters['config']
) => {
	return useRequest<NotFoundEnhancerResponse>(ApiUrlEnum.notFoundEnhancer, {
		body: {
			requestedUrl: typeof window !== 'undefined' && window.location.href,
			...body,
		},
		...config,
	})
}
