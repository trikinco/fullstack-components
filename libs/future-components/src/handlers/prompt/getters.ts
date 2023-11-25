import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { PromptResponse, PromptRequestBody } from './models'

/**
 * Prompt request
 */
export function getPrompt(body: PromptRequestBody, config?: RequestConfigOnly) {
	return request<PromptResponse>(ApiUrlEnum.prompt, { body, ...config })
}
