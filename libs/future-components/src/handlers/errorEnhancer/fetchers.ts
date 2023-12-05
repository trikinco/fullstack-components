import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type {
	ErrorEnhancementResponse,
	ErrorEnhancementRequestBody,
} from './models'

/**
 * Error enhancement fetcher
 */
export function fetchErrorEnhancement(
	body: ErrorEnhancementRequestBody,
	config?: RequestConfigOnly
) {
	return request<ErrorEnhancementResponse>(ApiUrlEnum.errorEnhancer, {
		body,
		...config,
	})
}
