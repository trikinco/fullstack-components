'use client'
import { useState, useEffect, type RefObject } from 'react'
import { useWindowSize } from './useWindowSize'
import { useWindowScroll } from './useWindowScroll'

export function useAnchorCoords(
	ref: RefObject<HTMLElement>,
	enabled?: boolean
) {
	const [coords, setCoords] = useState({ top: 0, right: 0 })
	const [width] = useWindowSize()
	const [scrollY] = useWindowScroll()

	useEffect(() => {
		if (!enabled || !ref.current) return

		const bounds = ref.current.getBoundingClientRect()
		const innerWidth = Math.min(
			document.documentElement.clientWidth || 0,
			width || 0
		)
		const rightOffset = innerWidth - bounds.right

		if (coords.top === bounds.top && coords.right === rightOffset) return

		setCoords({ top: bounds.top, right: rightOffset })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enabled, width, scrollY, coords])

	return coords
}

export default useAnchorCoords
