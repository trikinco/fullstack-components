'use client'
import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
	children: ReactNode
	/** The `id` attribute value of the DOM node to mount the component in  */
	id: string
}

/**
 * Mounts a component in an existing DOM node through a react portal
 */
export const Portal = ({ children, id }: PortalProps) => {
	const [mounted, setMounted] = useState(false)
	const portalElement =
		typeof window !== 'undefined' && document?.getElementById(id)

	useEffect(() => {
		setMounted(true)

		return () => setMounted(false)
	}, [])

	return mounted && portalElement ? createPortal(children, portalElement) : null
}

export default Portal
