'use client'

import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import { getText } from './getters'
import type { TextRequestBody, TextResponse, TextProps } from './models'

export const useText = (
	props: TextProps,
	config?: UseRequestConsumerConfig<TextRequestBody>
) => {
	return useRequest<TextResponse>(ApiUrlEnum.text, {
		...config,
		fetcher: () => getText(props),
	})
}
