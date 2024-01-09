'use client'
import { useRef, useState, useEffect } from 'react'

/**
 * Reports when `position: sticky` elements are stuck
 */
export function useIsStuck<T extends HTMLElement>(
	position: 'top' | 'right' | 'bottom' | 'left' = 'top'
) {
	const [isStuck, setIsStuck] = useState(false)
	const ref = useRef<T>(null)

	// Used for inline styles if needed
	const styles = {
		position: 'sticky',
		[position]: -1,
	}

	useEffect(() => {
		const cachedRef = ref.current
		const observer = new IntersectionObserver(
			([e]) => setIsStuck(e.intersectionRatio < 1),
			{ threshold: [1] }
		)

		if (cachedRef) {
			observer.observe(cachedRef)
		}

		return () => {
			if (cachedRef) observer.unobserve(cachedRef)
		}
	}, [ref])

	return {
		isStuck,
		styles,
		ref,
	}
}

export default useIsStuck
