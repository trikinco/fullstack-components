import { decode } from 'he'

export function removeHtmlTags(htmlString: string) {
	// Remove HTML tags from the input string
	let result = htmlString.replaceAll(/<[^>]*>/g, '')

	// Decode HTML entities (&amp; -> &...)
	result = decode(result)

	// Add space after removing HTML tags and decoding entities
	result = result.replaceAll(/(\S)(<|$)/g, '$1 ')

	// Replace consecutive spaces with a single space
	return result.replaceAll(/\s+/g, ' ').trim()
}
