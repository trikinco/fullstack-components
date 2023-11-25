'use server'

import { getHtmlPage } from '@trikinco/fullstack-components'

/**
 * Form action for generating a HTML page
 */
export const generateHtmlPage = async (_prevState: any, formData: FormData) => {
	'use server'

	const prompt = formData?.get('prompt') as string | undefined
	const src = formData?.get('src') as string | undefined
	const colors = formData?.get('colors') as string | undefined

	if (!prompt && !src && !colors) return ''

	return await getHtmlPage({
		prompt,
		src,
		colors,
	})
}
