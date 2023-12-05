import { IconSun } from '@/src/components/Icons/IconSun'
import { IconMoon } from '@/src/components/Icons/IconMoon'
import { IconEclipse } from '@/src/components/Icons/IconEclipse'

export interface ThemeIconProps {
	theme?: 'light' | 'dark' | 'system' | string
}

export const ThemeIcon = ({ theme }: ThemeIconProps) => {
	switch (theme) {
		case 'light':
			return <IconSun width={20} height={20} />
		case 'dark':
			return <IconMoon width={20} height={20} />
		case 'system':
		default:
			return <IconEclipse width={20} height={20} />
	}
}

export default ThemeIcon
