'use client'
import { memo } from 'react'
import { IconThemeSystem } from '@/src/components/Icons/IconThemeSystem'
import { IconThemeDark } from '@/src/components/Icons/IconThemeDark'
import { IconThemeLight } from '@/src/components/Icons/IconThemeLight'
import ThemeIcon from './ThemeIcon'

export interface ThemesProps {
	id: string
	theme: string | undefined
	setTheme: (theme: string) => void
}

const themes = [
	{
		name: 'light',
		image: (
			<IconThemeLight
				width={84}
				height={84}
				className="transform-gpu scale-105 origin-center transition-transform ease-in-out group-hover/icon:scale-110"
			/>
		),
	},
	{
		name: 'dark',
		image: (
			<IconThemeDark
				width={84}
				height={84}
				className="transform-gpu scale-105 origin-center transition-transform ease-in-out group-hover/icon:scale-110"
			/>
		),
	},
	{
		name: 'system',
		image: (
			<IconThemeSystem
				width={84}
				height={84}
				className="transform-gpu scale-105 origin-center transition-transform ease-in-out group-hover/icon:scale-110"
			/>
		),
	},
]

export const Themes = memo(function Themes({
	id,
	theme,
	setTheme,
}: ThemesProps) {
	return (
		<fieldset id={id} className="flex flex-col gap-3 text-right max-h-fit">
			<legend className="inline-flex gap-2 tracking-wide text-sm mb-8 px-1 ml-auto">
				Theme
				<ThemeIcon theme={theme} />
			</legend>
			<div className="flex gap-3 text-left">
				{themes.map(({ name, image }) => (
					<label
						key={name}
						className="group flex flex-col gap-2 -mt-2 cursor-pointer"
					>
						<span className="sr-only">Change theme to {name}</span>
						<input
							type="radio"
							name="theme"
							value={name}
							defaultChecked={theme === name}
							className="appearance-none peer"
							onChange={() => setTheme(name)}
						/>
						<span className="group/icon bg-white dark:bg-black w-20 h-20 rounded-md ring-black ring-offset-2 dark:ring-white dark:ring-offset-slate-700 peer-focus-visible:dark:ring-offset-slate-700 peer-focus-visible:ring-transparent peer-focus-visible:ring-offset-inherit peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[-webkit-focus-ring-color] peer-focus-visible:outline-offset-2 opacity-80 hover:opacity-100 peer-checked:opacity-100 peer-checked:ring-2 transition-opacity ease-in-out">
							<span className="flex transform overflow-hidden rounded-md bg-gradient-to-tr from-[#B5FFFC] to-[#FFDEE9]">
								{image}
							</span>
						</span>
						<span className="capitalize mx-2">{name}</span>
					</label>
				))}
			</div>
		</fieldset>
	)
})

export default Themes
