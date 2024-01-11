'use client'
import { useState, useId, useRef, type HTMLAttributes } from 'react'
import { useTheme } from 'next-themes'
import { merge } from '@trikinco/fullstack-components/utils'
import { useAnchorCoords } from '@/src/hooks/useAnchorCoords'
import { Dialog } from '@/src/components/Dialog'
import { Themes } from '@/src/modules/Theme/Themes'
import { IconClose } from '@/src/components/Icons/IconClose'
import { ThemeIcon } from '@/src/modules/Theme/ThemeIcon'
import { useIsMounted } from '@/src/hooks/useIsMounted'

export type ThemeSwitcherProps = HTMLAttributes<HTMLDivElement>

export const ThemeSwitcher = ({ className, ...rest }: ThemeSwitcherProps) => {
	const id = useId()
	const [open, setOpen] = useState(false)
	const focusReturnRef = useRef<HTMLButtonElement>(null)
	const coords = useAnchorCoords(focusReturnRef, open)
	const isMounted = useIsMounted()
	const { theme, setTheme } = useTheme()

	// Avoid hydration mismatch and reserve the space
	if (!isMounted) {
		return <div className="inline-block ml-auto w-7 h-5 px-1" />
	}

	return (
		<div className={merge('relative', className)} {...rest}>
			<button
				ref={focusReturnRef}
				type="button"
				className="group/theme inline-flex gap-2 tracking-wide text-sm mb-1 ml-auto text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 rounded-md focus-ring"
				onClick={() => setOpen(true)}
			>
				<span className="sr-only">Theme</span>
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
				labelClose={<IconClose width={20} height={20} />}
				formProps={{ className: 'p-6' }}
				style={coords}
			>
				<Themes id={id} theme={theme} setTheme={setTheme} />
			</Dialog>
		</div>
	)
}

export default ThemeSwitcher
