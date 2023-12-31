/* eslint-disable @typescript-eslint/naming-convention */
import { HtmlPageError } from './models'

/**
 * Return only <!DOCTYPE html><html>...</html>
 * 
 * @consideration sanitize with `jsdom` and `DOMPurify`
    const window = new JSDOM('').window
	const purify = DOMPurify(window)

    // Modify config for allowed schemes etc.
	purify.setConfig({
		WHOLE_DOCUMENT: true,
		USE_PROFILES: { html: true, svg: true, svgFilters: true },
	})

	return purify.sanitize(htmlString)
 */
export const getHtmlFromChatResponseText = (responseText?: string): string => {
	if (!responseText) {
		throw new HtmlPageError(new Error('No HTML response text'))
	}

	// Only get the relevant HTML markup - gpt loves returning markdown
	// eslint-disable-next-line unicorn/prevent-abbreviations
	const docType = responseText.indexOf('<!DOCTYPE html>')
	const htmlTag = responseText.match(/<html[^>]*>/)?.index ?? -1
	const start = docType === -1 ? htmlTag : docType
	const end = responseText.indexOf('</html>')
	const body = responseText.slice(start, end + '</html>'.length)

	if (!docType) {
		return `<!DOCTYPE html>${body}`
	}

	return body
}
