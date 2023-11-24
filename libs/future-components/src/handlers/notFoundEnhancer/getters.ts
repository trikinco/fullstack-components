import { request } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type {
	NotFoundEnhancerResponse,
	NotFoundEnhancerRequestBody,
} from './models'

/**
 * Not found enhancement request
 */
export function getNotFoundEnhancement(body: NotFoundEnhancerRequestBody) {
	return request<NotFoundEnhancerResponse>(ApiUrlEnum.notFoundEnhancer, {
		body,
	})
}
