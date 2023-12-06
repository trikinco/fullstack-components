import type { ReactNode, HTMLAttributes } from 'react'

export interface DialogBaseProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

/**
 * Base layout for a dialog that only renders if it has children
 */
export const DialogBase = ({ children, ...rest }: DialogBaseProps) => {
	if (!children) return null

	return (
		<div className="fixed inset-0 z-10 w-screen overflow-y-auto" {...rest}>
			<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 sm:w-full sm:max-w-xl shadow-xl rounded-xl">
					<div className="sm:flex sm:items-start">
						<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
