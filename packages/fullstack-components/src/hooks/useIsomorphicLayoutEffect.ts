import { useEffect, useLayoutEffect } from 'react'

/**
 * Switch between useEffect and useLayoutEffect based on the execution environment.
 */
export const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect
