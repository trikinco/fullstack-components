import { useRequest, type UseRequestConfig } from '../../hooks/useRequest'

export const usePrompt = <T = string>(
	prompt: string,
	config?: UseRequestConfig<T>
) => {
	return useRequest<T>('/api/fsutils/prompt', {
		...config,
		body: {
			prompt,
		},
	})
}
