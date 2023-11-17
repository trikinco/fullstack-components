import { useRequest, type UseRequestConfig } from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const usePrompt = <T = string>(
	prompt: string,
	config?: UseRequestConfig<T>
) => {
	return useRequest<T>(ApiUrlEnum.prompt, {
		...config,
		body: {
			prompt,
		},
	})
}
