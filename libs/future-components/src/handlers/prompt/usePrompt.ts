'use client'

import type { PromptResponse, PromptRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const usePrompt = <T = PromptResponse>(
	body: PromptRequestBody,
	config?: UseRequestConsumerConfig<PromptRequestBody>
) => {
	return useRequest<T>(ApiUrlEnum.prompt, {
		body,
		...config,
	})
}
