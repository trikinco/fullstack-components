'use client'

import type { SelectResponse, SelectRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * Select client hook
 */
export interface UseSelectParameters {
	body: SelectRequestBody
	config?: UseRequestConsumerConfig<SelectRequestBody>
}

export const useSelect = (
	body: UseSelectParameters['body'],
	config?: UseSelectParameters['config']
) => {
	return useRequest<SelectResponse>(ApiUrlEnum.select, {
		body,
		...config,
	})
}
