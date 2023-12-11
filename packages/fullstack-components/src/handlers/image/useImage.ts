'use client'

import type { ImageRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * Image client hook
 */
export interface UseImageParameters {
	body: ImageRequestBody
	config?: UseRequestConsumerConfig<ImageRequestBody>
}

export function useImage(
	body: ImageRequestBody & { n?: 1 | 0 | null },
	config?: UseRequestConsumerConfig<ImageRequestBody>
): ReturnType<typeof useRequest<string, ImageRequestBody>>
export function useImage(
	body: ImageRequestBody & { n: number },
	config?: UseRequestConsumerConfig<ImageRequestBody>
): ReturnType<typeof useRequest<string[], ImageRequestBody>>
export function useImage(
	body: ImageRequestBody,
	config?: UseRequestConsumerConfig<ImageRequestBody>
) {
	return useRequest(ApiUrlEnum.image, {
		body,
		...config,
	})
}
