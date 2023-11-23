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
	errorContext: ErrorEnhancementRequestBody,
	config?: UseRequestConsumerConfig<ErrorEnhancementRequestBody>
) => {
	return useRequest<ErrorEnhancementResponse>(ApiUrlEnum.errorEnhancer, {
		...config,
		body: errorContext,
	})
}
