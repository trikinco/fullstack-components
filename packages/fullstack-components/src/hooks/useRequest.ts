'use client'

import { useState, useEffect, useRef } from 'react'
import { request } from '../utils/request'
import type { RequestConfig } from '../types'

/**
 * Fetch request config initialiser in addition to the `baseUrl`.
 * @see RequestConfig
 */
export type UseRequestConfig<
	TResponse = unknown,
	Tbody = unknown,
> = RequestConfig<Tbody> & {
	/**
	 * Enables the fetch call.
	 * @default `true`
	 */
	isEnabled?: boolean
	/** Custom fetcher function enabling replacement of the built-in `request` in `requestData`  */
	fetcher?: (
		/** Relative API url */
		url: string
	) => Promise<TResponse>
}

/**
 * Config for hooks consuming `useRequest`
 * @see UseRequestConfig
 */
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

/**
 * Fetch utility hook for calling internal Next.js API route handlers.
 * Handles loading, error and data states.
 */
export const useRequest = <TResponse = unknown, Tbody = unknown>(
	/** Relative API url */
	url: string,
	/**
	 * Fetch request config initialiser in addition to the `baseUrl`
	 * @link UseRequestConfig
	 */
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
			const content = await requestData<TResponse, Tbody>(url, requestConfig)

			setData(content)
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
		isEnabledReference.current = isEnabled

		return () => {
			isEnabledReference.current = false
		}
	}, [isEnabled])

	useEffect(() => {
		if (isEnabledReference.current) {
			isEnabledReference.current = false
			void fetchData()
		}
	}, [url, isEnabled])

	// Clean up any object URLs created by the `blob` response `type`.
	useEffect(() => {
		return () => {
			if (data && requestConfig.responseType === 'blob') {
				URL.revokeObjectURL(data as string)
			}
		}
	}, [])

	return { isLoading, isError, error, data, refetch }
}
