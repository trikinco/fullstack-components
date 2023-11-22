'use client'
import { useState, useEffect, useRef } from 'react'
import { request } from '../utils/request'
import type { RequestConfig } from '../types'

/** Fetch request config initialiser in addition to the `baseUrl` */
export type UseRequestConfig<
	TResponse = unknown,
	Tbody = unknown,
> = RequestConfig<Tbody> & {
	/** Whether the hook should run or not */
	isEnabled?: boolean
	/** Custom fetcher function enabling replacement of the built-in `request` in `requestData`  */
	fetcher?: (
		/** Relative API url */
		url: string
	) => Promise<TResponse>
}

/** Config for hooks consuming `useRequest` */
export type UseRequestConsumerConfig<Tbody = unknown> = Omit<
	UseRequestConfig<unknown, Tbody>,
	'fetcher'
>

const requestData = <TResponse = unknown, Tbody = unknown>(
	/** Relative API url */
	url: string,
	/** Fetch request config initialiser in addition to the `baseUrl` */
	config: UseRequestConfig<TResponse, Tbody>
) => {
	const { fetcher, ...requestConfig } = config

	if (fetcher !== undefined) {
		return fetcher(url)
	}

	return request<TResponse, Tbody>(url, requestConfig)
}

export const useRequest = <TResponse = unknown, Tbody = unknown>(
	/** Relative API url */
	url: string,
	/** Fetch request config initialiser in addition to the `baseUrl` */
	config: UseRequestConfig<TResponse, Tbody>
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
			const json = await requestData<TResponse, Tbody>(url, requestConfig)

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
