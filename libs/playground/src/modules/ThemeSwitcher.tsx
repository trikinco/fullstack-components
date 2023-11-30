'use client'
import { useState, useEffect, useId, useRef } from 'react'
import { useTheme } from 'next-themes'
import { useAnchorCoords } from '@/src/hooks/useAnchorCoords'
import { Dialog } from '@/src/components/Dialog'
import { Themes } from '@/src/modules/Themes'
import { IconClose } from '@/src/components/Icons/IconClose'
import { ThemeIcon } from '@/src/modules/ThemeIcon'

export const ThemeSwitcher = () => {
	const id = useId()
	const [open, setOpen] = useState(false)
	const focusReturnRef = useRef<HTMLButtonElement>(null)
	const coords = useAnchorCoords(focusReturnRef, open)
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<div className="relative flex flex-col">
			<button
				ref={focusReturnRef}
				type="button"
				className="group/theme inline-flex gap-2 tracking-wide text-sm mb-1 px-1 ml-auto text-slate-400 hover:text-slate-500 dark:hover:text-slate-200"
				aria-controls={id}
				onClick={() => setOpen(true)}
			>
				<span className="transition-opacity opacity-0 group-hover/theme:opacity-100">
					Theme
				</span>
				<ThemeIcon theme={theme} />
			</button>
			<Dialog
				title="Change theme"
				open={open}
				onClose={() => setOpen(false)}
				focusReturnRef={focusReturnRef}
				className="bg-gray-100 dark:bg-slate-700 rounded-lg left-[inherit] -mt-6 -mr-6 shadow-xl [@media(max-width:416px)]:left-0 [@media(max-width:416px)]:!right-[inherit]"
				closeProps={{
					className: 'absolute top-5 left-5 right-[inherit] ml-0 mr-auto p-2',
					title: 'Close',
					'aria-label': 'Close',
				}}
				labelClose={<IconClose />}
				formProps={{ className: 'p-6' }}
				style={coords}
			>
				<Themes id={id} theme={theme} setTheme={setTheme} />
			</Dialog>
		</div>
	)
}

export default ThemeSwitcher
