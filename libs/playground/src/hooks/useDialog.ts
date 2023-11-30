'use client'
import {
	useEffect,
	useCallback,
	useId,
	useRef,
	type RefObject,
	type SyntheticEvent,
} from 'react'

export interface UseDialogProps {
	/** The element to return focus to after closing the dialog. WCAG */
	focusReturnRef?: RefObject<HTMLElement>
	/** The element to set focus on when opening the dialog. WCAG */
	focusInitialRef?: RefObject<HTMLElement>
	/** The dialog open state */
	open?: boolean
	/** Whether the dialog should close when clicking its backdrop. Default true */
	closeOnClickBackdrop?: boolean
	/** Callback when the dialog closes. Returns form data. */
	onClose?: (data?: any[]) => void
}

/**
 * Handler hook for the `Dialog` component
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog | MDN - Dialog element}
 */
export const useDialog = (props?: UseDialogProps) => {
	const {
		onClose,
		open,
		closeOnClickBackdrop = true,
		focusInitialRef,
		focusReturnRef,
	} = props || {}
	const id = useId()
	const dialogRef = useRef<HTMLDialogElement>(null)
	const formRef = useRef<HTMLFormElement>(null)

	/**
	 * Triggers focus on the passed-in `ref`
	 */
	const handleRefFocus = (ref?: RefObject<HTMLElement>) => {
		if (!ref?.current) return

		// async focus - ensuring the ref is available
		setTimeout(() => {
			ref.current?.focus()
		}, 0)
	}

	/**
	 * Call `onClose` callback with any form data,
	 * Set focus back to the initiating element.
	 */
	const handleClose = useCallback(() => {
		const formData = formRef?.current ? new FormData(formRef.current) : null
		const formEntries = Array.from(formData?.entries() || [])
		document.body.classList.remove('no-scroll')

		onClose?.(formEntries)
		handleRefFocus(focusReturnRef)
	}, [onClose, focusReturnRef])

	/**
	 * Close the dialog when clicking its ::backdrop
	 */
	const handleBackdropClick = useCallback(
		(event: SyntheticEvent<HTMLDialogElement>) => {
			if (!closeOnClickBackdrop || !dialogRef.current) return

			if (event.target === event.currentTarget) {
				dialogRef.current.close()
			}
		},
		[closeOnClickBackdrop]
	)

	/**
	 * Handles programmatic toggle of the dialog
	 * Uses an effect, as only setting `open` doesn't account for
	 * making the document inert, unlike what `showModal` does.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement MDN - HTML Dialog Element}
	 */
	useEffect(() => {
		if (!dialogRef?.current) return

		if (open) {
			dialogRef.current.showModal()
			document.body.classList.add('no-scroll')

			// Set focus on the most relevant dialog content when opening. WCAG
			handleRefFocus(focusInitialRef)
		} else {
			dialogRef.current.close()
		}
	}, [open, focusInitialRef])

	/**
	 * Trigger callbacks when the dialog is closed,
	 * to handle any external `open` states.
	 *
	 * Accounts for:
	 * - event handlers calling `dialogRef?.current?.close()`
	 * - form submissions
	 * - pressing esc
	 */
	useEffect(() => {
		const dialog = dialogRef?.current

		dialog?.addEventListener('close', handleClose)

		return () => {
			dialog?.removeEventListener('close', handleClose)
		}
	}, [handleClose])

	return {
		id,
		dialogRef,
		formRef,
		handleBackdropClick,
	}
}
