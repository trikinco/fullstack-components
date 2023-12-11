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

export interface UseErrorEnhancementParameters {
	body: ErrorEnhancementRequestBody
	config?: UseRequestConsumerConfig<ErrorEnhancementRequestBody>
}

export const useErrorEnhancement = (
	body: UseErrorEnhancementParameters['body'],
	config?: UseErrorEnhancementParameters['config']
) => {
	return useRequest<ErrorEnhancementResponse>(ApiUrlEnum.errorEnhancer, {
		body,
		...config,
	})
}
