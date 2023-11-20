import { type HTMLAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export interface SmartErrorProps extends HTMLAttributes<HTMLDivElement> {
	title?: string
	message?: string
	// Same error types as the `error` route pattern
	error?: Error & { digest?: string }
}

/**
 * Generic error
 * Used to stream errors in a client component
 */
export const SmartError = ({
	className,
	title,
	message,
	error,
	...rest
}: SmartErrorProps) => {
	// Fetch your error while showing a fallback
	return (
		<div className={merge('block', className)} {...rest}>
			<span>{title}</span>
			{message}
		</div>
	)
}
