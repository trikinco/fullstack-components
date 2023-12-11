'use client'

import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { fetchText } from './fetchers'
import type { TextRequestBody, TextResponse, TextParameters } from './models'

/**
 * Text client hook
 */
export interface UseTextParameters {
	body: TextParameters
	config?: UseRequestConsumerConfig<TextRequestBody>
}

export const useText = (
	body: UseTextParameters['body'],
	config?: UseTextParameters['config']
) => {
	return useRequest<TextResponse>(ApiUrlEnum.text, {
		...config,
		fetcher: () => fetchText(body),
	})
}
