import { request, type RequestConfigOnly } from '../../utils/request'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'
import type { SelectResponse, SelectRequestBody } from './models'

/**
 * Select generation fetcher
 */
export function fetchSelect(
	body: SelectRequestBody,
	config?: RequestConfigOnly
) {
	return request<SelectResponse>(ApiUrlEnum.select, { body, ...config })
}
