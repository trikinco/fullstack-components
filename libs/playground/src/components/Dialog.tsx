'use client'
import type {
	HTMLAttributes,
	DetailedHTMLProps,
	FormHTMLAttributes,
	ReactNode,
} from 'react'
import { useDialog, type UseDialogProps } from '../hooks/useDialog'
import { merge } from '../utils/styles'

export interface DialogProps
	extends UseDialogProps,
		HTMLAttributes<HTMLDialogElement> {
	children?: ReactNode
	/** Accessible title for the dialog. WCAG */
	title: string
	/** Element ID to description of the dialog content. `aria-describedby` WCAG */
	describedById?: string
	/** */
	dialogId?: string
	/** The visible label for the button that closes the dialog. Default "Accept and close" */
	labelClose?: string
	/** Props to pass to the `<form>`, the direct child of the `<dialog>` */
	formProps?: DetailedHTMLProps<
		FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	>
}

/**
 * A Dialog using the native `dialog` element
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog | MDN - Dialog element}
 */
export const Dialog = ({
	onClose,
	children,
	open,
	title,
	describedById,
	dialogId,
	className,
	formProps,
	labelClose = 'Accept and close',
	closeOnClickBackdrop = true,
	focusInitialRef,
	focusReturnRef,
	...rest
}: DialogProps) => {
	const { className: classNameForm, ...restForm } = formProps || {}

	const { handleBackdropClick, dialogRef, id, formRef } = useDialog({
		onClose,
		open,
		focusInitialRef,
		focusReturnRef,
		closeOnClickBackdrop,
	})

	return (
		<>
			<dialog
				ref={dialogRef}
				onClick={handleBackdropClick}
				id={id}
				aria-label={title}
				aria-describedby={describedById}
				// 0 border and padding to handle backdrop clicking the correct target
				className={merge(
					'border-0 p-0 w-full max-w-full max-h-screen',
					className
				)}
				{...rest}
			>
				<form
					ref={formRef}
					// When form method='dialog', preventDefault isn't needed
					method="dialog"
					className={merge(
						'mx-auto w-full flex flex-col gap-3 p-3 bg-transparent',
						classNameForm
					)}
					{...restForm}
				>
					<button
						formMethod="dialog"
						className="ml-auto bg-white/80 text-black border border-1 border-white/90 sticky top-3 right-0 py-2 px-6 z-50 rounded-md focus:outline-none focus:ring focus:ring-offset-2"
						onClick={() => dialogRef?.current?.close()}
					>
						{labelClose}
					</button>

					{children}
				</form>
			</dialog>
		</>
	)
}

export default Dialog
