import type {
	DetectPiiResponse,
	DetectPiiRequestBody,
} from './detectPiiHandlers'
import { useRequest, type UseRequestConfig } from '../../hooks/useRequest'

export const useDetectPii = (
	content: string,
	config?: UseRequestConfig<DetectPiiRequestBody>
) => {
	return useRequest<DetectPiiResponse>('/api/fsutils/detectPii', {
		...config,
		body: {
			content: content,
		},
	})
}
