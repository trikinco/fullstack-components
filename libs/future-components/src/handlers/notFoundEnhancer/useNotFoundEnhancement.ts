import { useEffect, useState } from 'react'
import { NotFoundEnhancerResponse } from './notFoundEnhancer'
import { request } from '../../utils/api'

export const useNotFoundEnhancement = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [content, setContent] = useState<NotFoundEnhancerResponse | undefined>()

	useEffect(() => {
		const fetchData = async () => {
			const parsedResponse = await request<NotFoundEnhancerResponse>(
				'/api/fsutils/not-found-enhancer',
				{
					body: {
						requestedUrl: window && window.location.href,
					},
				}
			)

			setContent(parsedResponse)
			setIsLoading(false)
		}

		void fetchData()
	}, [])

	return { isLoading, content }
}
