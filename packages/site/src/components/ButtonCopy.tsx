'use client'

import { useState, type HTMLAttributes } from 'react'
import { IconCheck } from './Icons/IconCheck'
import { IconFile } from './Icons/IconFile'
import { merge } from '../../../fullstack-components/dist/utils'

export interface ButtonCopyProps extends HTMLAttributes<HTMLButtonElement> {
	text?: string
}

/**
 * Button used to copy `text` to the clipboard
 */
export const ButtonCopy = ({ className, text, ...rest }: ButtonCopyProps) => {
	const [isCopied, setIsCopied] = useState(false)
	const label = isCopied ? 'Copied!' : 'Copy'

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
				'w-9 h-9 inline-flex items-center justify-center rounded-md border-2 bg-white dark:bg-slate-950 border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-slate-900 focus-ring',
				className
			)}
			disabled={isCopied}
			aria-label={label}
			onClick={copy}
			{...rest}
		>
			{isCopied ? (
				<IconCheck width={20} height={20} />
			) : (
				<IconFile width={20} height={20} />
			)}
			<span className="sr-only">{label}</span>
		</button>
	)
}
