'use client'
import { useRef, useState, useEffect } from 'react'

export function useIsMounted() {
	const ref = useRef(false)
	const [, setIsMounted] = useState(false)

	useEffect(() => {
		ref.current = true
		setIsMounted(true)

		return () => {
			ref.current = false
		}
	}, [])

	return ref.current
}
