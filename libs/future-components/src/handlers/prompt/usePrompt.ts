'use client'

import type { PromptResponse } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const usePrompt = <T = PromptResponse>(
	prompt: string,
	config?: UseRequestConsumerConfig<T>
) => {
	return useRequest<T>(ApiUrlEnum.prompt, {
		...config,
		body: {
			prompt,
		},
	})
}
