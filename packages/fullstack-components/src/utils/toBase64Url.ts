/**
 * Converts text content or array buffer files to base64 string URLs
 * @example return value 'data:audio/mpeg;base64,V0VCvdSBhc...'
 */
export function toBase64Url(
	content: string | ArrayBuffer | undefined,
	/** mime type */
	type: string
) {
	if (!content) return ''

	const base64String = Buffer.from(content as string).toString('base64')

	if (!base64String) return ''

	return `data:${type};base64,${base64String}`
}
