import { useState, useEffect, useRef } from 'react'
import { request, type RequestConfig } from '../utils/request'

/** Fetch request config initialiser in addition to the `baseUrl` */
export type UseRequestConfig<Tbody = unknown> = RequestConfig<Tbody> & {
	/** Whether the hook should run or not */
	isEnabled?: boolean
}

export const useRequest = <TResponse = unknown, Tbody = unknown>(
	/** Relative API url */
	url: string,
	/** Fetch request config initialiser in addition to the `baseUrl` */
	config: UseRequestConfig<Tbody>
) => {
	const { isEnabled = true, ...requestConfig } = config
	const isEnabledReference = useRef(isEnabled)
	const [data, setData] = useState<TResponse | undefined>()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [error, setError] = useState<unknown>()

	const fetchData = async () => {
		if (!url || !isEnabled) return

		setIsLoading(true)

		try {
			const json = await request<TResponse, Tbody>(url, requestConfig)

			setData(json)
			setError(null) // eslint-disable-line unicorn/no-null
			setIsError(false)
		} catch (error) {
			setError(error)
			setIsError(true)
		} finally {
			setIsLoading(false)
		}
	}

	const refetch = () => {
		void fetchData()
	}

	useEffect(() => {
		if (isEnabledReference.current) {
			isEnabledReference.current = false
			void fetchData()
		}

		return () => {
			isEnabledReference.current = false
		}
	}, [url, isEnabled])

	return { isLoading, isError, error, data, refetch }
}
