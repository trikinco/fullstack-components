'use client'
import { useState, useEffect } from 'react'
import { setup, defineConfig } from '@twind/core'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwind from '@twind/preset-tailwind'

export const config = defineConfig({
	darkMode: 'class',
	presets: [presetAutoprefix(), presetTailwind()],
})

/**
 * Allows using injected tailwind classes during runtime.
 * Since tw only generates the styles for classnames used during buildtime.
 *
 * This is needed as using the play CDN for tw results in duplicate styles:
 * our Next.js buildtime styles plus all the styles from play.cdn.
 * This causes bloat, CSS bugs, and huge conflicts with 'next-themes',
 * when the user changes light/dark theme.
 *
 * @note use sparingly
 *
 * Workaround for lacking twind app dir support
 * @see {@link https://github.com/tw-in-js/use-twind-with/issues/32}
 */
export function useRuntimeStyles() {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadTwind = async () => {
			setup(config)
			setIsLoading(false)
		}
		loadTwind()
	}, [])

	return isLoading
}

export default useRuntimeStyles
