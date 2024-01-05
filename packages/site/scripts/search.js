/**
 * This script is used to generate a json file out of all docs pages
 * at build time. The file is used as search indexation data.
 *
 * The 'pages.json' file is fetched (and cached) when users
 * interact with the search bar.
 */
const fs = require('fs')
const { join } = require('path')
const { JSDOM } = require('jsdom')

const DOCS_DIR = 'docs'
const PAGES_PATH = join(__dirname, '../src/app', DOCS_DIR)
const EXPORT_PATH = join(__dirname, '../public', 'pages.json')

/**
 * Parse a html string to HTML
 */
function parseHtmlString(html) {
	const dom = new JSDOM(html)
	const document = dom.window.document

	return document
}

/**
 * Create structured data for search = require(a virtual DOM body)
 */
function structurePage(body) {
	const title = body.querySelector('h1')?.textContent || ''
	const content = []
	let currentSection = null

	// Create section collections between each heading element in the body
	Array.from(body.children).forEach((node) => {
		const element = node.outerHTML

		if (element.match(/<h[1-6]/)) {
			if (currentSection) {
				content.push(currentSection)
			}
			currentSection = {
				title: node.textContent || '',
				id: node.id,
				content: [],
			}
		} else if (currentSection) {
			currentSection.content.push(node.textContent || '')
		}
	})

	// Add the last section if it exists
	if (currentSection) {
		content.push(currentSection)
	}

	return {
		title,
		content,
	}
}

/**
 * Parses an mdx page and returns searchable structured content
 */
async function structureMdxContent(text, id, route) {
	// ESM modules must be dynamically imported
	const unified = (await import('unified')).unified
	const parse = (await import('remark-parse')).default
	const gfm = (await import('remark-gfm')).default
	const stringify = (await import('rehype-stringify')).default
	const rehype = (await import('remark-rehype')).default
	const rehypeSlug = (await import('rehype-slug')).default
	const rehypeAutolinkHeadings = (await import('rehype-autolink-headings'))
		.default

	const file = await unified()
		.use(parse, { fragment: true })
		.use(rehype)
		.use(rehypeAutolinkHeadings)
		.use(rehypeSlug)
		.use(gfm)
		.use(stringify)
		.process(text)

	const htmlString = file.toString()
	// Ensure we only use the content after the first header to ignore unprocessed .mdx imports
	const html = htmlString.slice(htmlString.match(/<h1[^>]*>/)?.index ?? 0)
	const body = parseHtmlString(html).body
	const { title, content } = structurePage(body)

	return {
		id,
		title,
		route,
		content,
	}
}

/**
 * Gets structured data from .mdx pages
 * This structured data is much easier and faster to search than a whole, unprocessed doc/page
 */
async function getMdxPagesContent(pathname) {
	try {
		const contentPromises = fs
			.readdirSync(pathname, 'utf8')
			.filter((path) => !/\.tsx?$/.test(path))
			.map(async (page) => {
				const route = join(DOCS_DIR, page)
				const text = fs.readFileSync(join(pathname, page, 'page.mdx'), 'utf8')

				return await structureMdxContent(text, page, route)
			})

		return await Promise.all(contentPromises)
	} catch (error) {
		throw new Error(`Could not get MDX pages content for ${pathname}: ${error}`)
	}
}

async function main() {
	const mdxFiles = await getMdxPagesContent(PAGES_PATH)

	fs.writeFileSync(EXPORT_PATH, JSON.stringify(mdxFiles))
}

main()
