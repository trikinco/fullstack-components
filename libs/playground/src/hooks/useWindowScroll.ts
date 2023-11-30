'use client'
import { useState, useLayoutEffect } from 'react'

export function useWindowScroll() {
	const [scroll, setScroll] = useState([0, 0])

	useLayoutEffect(() => {
		function updateScroll() {
			setScroll([window.scrollY, window.scrollX])
		}

		window.addEventListener('scroll', updateScroll)
		updateScroll()

		return () => window.removeEventListener('scroll', updateScroll)
	}, [])

	return scroll
}

export default useWindowScroll
