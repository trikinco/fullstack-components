import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { SelectResponse, SelectRequestBody } from './models'

/**
 * Select generation request
 */
export function getSelect(body: SelectRequestBody, config?: RequestConfigOnly) {
	return request<SelectResponse>(ApiUrlEnum.select, { body, ...config })
}
