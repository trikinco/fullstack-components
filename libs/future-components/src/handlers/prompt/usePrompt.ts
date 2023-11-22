import {
	useRequest,
	type UseRequestConsumerConfig,
} from '../../hooks/useRequest'
import { ApiUrlEnum } from '../../enums/ApiUrlEnum'

export const usePrompt = <T = string>(
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
