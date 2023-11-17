'use client'

import { useState, type HTMLAttributes } from 'react'
import { IconCheck } from './Icons/IconCheck'
import { IconFile } from './Icons/IconFile'
import { merge } from '@trikinco/fullstack-components/utils'

export interface ButtonCopyProps extends HTMLAttributes<HTMLButtonElement> {
	text?: string
}

/**
 * Button used to copy `text` to the clipboard
 */
export const ButtonCopy = ({ className, text, ...rest }: ButtonCopyProps) => {
	const [isCopied, setIsCopied] = useState(false)

	const copy = async () => {
		await navigator.clipboard.writeText(text?.trim() || '')
		setIsCopied(true)

		setTimeout(() => {
			setIsCopied(false)
		}, 3000)
	}

	return (
		<button
			className={merge(
				'w-9 h-9 inline-flex items-center justify-center rounded-md border-2 border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10',
				className
			)}
			disabled={isCopied}
			onClick={copy}
			{...rest}
		>
			{isCopied ? <IconCheck /> : <IconFile />}
			<span className="sr-only">{isCopied ? 'Copied!' : 'Copy'}</span>
		</button>
	)
}
