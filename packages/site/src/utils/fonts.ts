import { Space_Grotesk, Space_Mono } from 'next/font/google'

export const fontBase = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-base',
})

export const fontMono = Space_Mono({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-mono',
})

/**
 * The classNames for variable `next/font` to apply to
 * the body/wrapper element.
 */
export const fontClassNames = `font-sans ${fontBase.variable} ${fontMono.variable}`
