'use client'

import type { SelectResponse, SelectRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const useSelect = (
	body: SelectRequestBody,
	config?: UseRequestConsumerConfig<SelectRequestBody>
) => {
	return useRequest<SelectResponse>(ApiUrlEnum.select, {
		body,
		...config,
	})
}
