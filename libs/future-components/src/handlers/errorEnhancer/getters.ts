import { request } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type {
	ErrorEnhancementResponse,
	ErrorEnhancementRequestBody,
} from './models'

/**
 * Error enhancement request
 */
export function getErrorEnhancement(body: ErrorEnhancementRequestBody) {
	return request<ErrorEnhancementResponse>(ApiUrlEnum.errorEnhancer, { body })
}
