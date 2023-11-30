import { IconSun } from '@/src/components/Icons/IconSun'
import { IconMoon } from '@/src/components/Icons/IconMoon'
import { IconEclipse } from '@/src/components/Icons/IconEclipse'

export interface ThemeIconProps {
	theme?: 'light' | 'dark' | 'system' | string
}

export const ThemeIcon = ({ theme }: ThemeIconProps) => {
	switch (theme) {
		case 'light':
			return <IconSun />
		case 'dark':
			return <IconMoon />
		case 'system':
		default:
			return <IconEclipse />
	}
}

export default ThemeIcon
