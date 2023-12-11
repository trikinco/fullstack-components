'use client'

import type { PromptResponse, PromptRequestBody } from './models'
import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

/**
 * Prompt client hook
 */
export interface UsePromptParameters {
	/**
	 * @see `PromptRequestBody`
	 */
	body: PromptRequestBody
	config?: UseRequestConsumerConfig<PromptRequestBody>
}

export const usePrompt = <T = PromptResponse>(
	body: UsePromptParameters['body'],
	config?: UsePromptParameters['config']
) => {
	return useRequest<T>(ApiUrlEnum.prompt, {
		body,
		...config,
	})
}
