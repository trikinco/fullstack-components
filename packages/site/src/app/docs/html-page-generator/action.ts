'use server'

import { getHtmlPage } from '@trikinco/fullstack-components'

/**
 * Form action for generating a HTML page
 */
export async function generateHtmlPage(
	_prevState: any,
	formData: FormData
): Promise<string> {
	const prompt = formData?.get('prompt') as string | undefined
	const src = formData?.get('src') as string | undefined
	const colors = formData?.get('colors') as string | undefined
	const html = formData?.get('html') as string | undefined

	const response = await getHtmlPage({
		prompt,
		src,
		colors,
		html,
	})

	return response.responseText
}
