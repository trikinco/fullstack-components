'use client'

import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { fetchText } from './fetchers'
import type { TextRequestBody, TextResponse, TextProps } from './models'

export const useText = (
	props: TextProps,
	config?: UseRequestConsumerConfig<TextRequestBody>
) => {
	return useRequest<TextResponse>(ApiUrlEnum.text, {
		...config,
		fetcher: () => fetchText(props),
	})
}
