import { useEffect, useState } from 'react'
import {
	NotFoundEnhancerRequestBody,
	NotFoundEnhancerResponse,
} from './notFoundEnhancer'

export const useNotFoundEnhancement = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [content, setContent] = useState<NotFoundEnhancerResponse | undefined>()
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/fsutils/not-found-enhancer', {
				method: 'POST',
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					requestedUrl: window && window.location.href,
				} as NotFoundEnhancerRequestBody),
			})
			const parsedResponse = (await response.json()) as NotFoundEnhancerResponse

			setContent(parsedResponse)
			setIsLoading(false)
		}

		void fetchData()
	}, [])

	return { isLoading, content }
}
