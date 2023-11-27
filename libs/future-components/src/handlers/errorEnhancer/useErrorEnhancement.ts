'use client'

import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import type {
	ErrorEnhancementRequestBody,
	ErrorEnhancementResponse,
} from './models'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const useErrorEnhancement = (
	body: ErrorEnhancementRequestBody,
	config?: UseRequestConsumerConfig<ErrorEnhancementRequestBody>
) => {
	return useRequest<ErrorEnhancementResponse>(ApiUrlEnum.errorEnhancer, {
		body,
		...config,
	})
}
