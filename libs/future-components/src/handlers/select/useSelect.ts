import type { SelectResponse, SelectRequestBody } from './models'
import { useRequest, type UseRequestConfig } from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const useSelect = (
	body: SelectRequestBody,
	config?: UseRequestConfig
) => {
	return useRequest<SelectResponse>(ApiUrlEnum.select, {
		body,
		...config,
	})
}
