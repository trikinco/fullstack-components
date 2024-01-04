import { JSDOM } from 'jsdom'

/**
 * Parse a html string to HTML
 */
export function parseHtmlString(html: string) {
	const dom = new JSDOM(html)
	const document = dom.window.document

	return document
}
