/**
 * Check if a string is a valid HTTP/S URL.
 */
export function isValidUrl(text: string) {
	let url

	try {
		url = new URL(text)
	} catch (_error) {
		return false
	}

	return url.protocol === 'http:' || url.protocol === 'https:'
}
