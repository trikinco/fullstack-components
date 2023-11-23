'use client'

import type { ImageResponse, ImageRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const useImage = (
	body: ImageRequestBody,
	config?: UseRequestConsumerConfig<ImageRequestBody>
) => {
	return useRequest<ImageResponse>(ApiUrlEnum.image, {
		body,
		...config,
	})
}
