/**
 * This script is used to generate a json file out of all docs pages
 * at build time. The file is used as search indexation data.
 *
 * The 'pages.json' file is fetched (and cached) when users
 * interact with the search bar.
 */
import fs from 'fs'
import { join } from 'path'
import { JSDOM } from 'jsdom'
import { unified } from 'unified'
import parse from 'remark-parse'
import gfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import slug from 'rehype-slug'
import stringify from 'rehype-stringify'
import rehype from 'remark-rehype'
import mdx from 'remark-mdx'
import { visit } from 'unist-util-visit'

const DOCS_DIR = '/docs'
const LIB_PATH = join(process.cwd(), '../fullstack-components')
const PAGES_PATH = join(process.cwd(), 'src/app', DOCS_DIR)
const EXPORT_PATH = join(process.cwd(), 'public', 'pages.json')

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

// Helper function to convert attributes to props
function getProps(attributes) {
	const props = {}
	attributes.forEach((attribute) => {
		props[attribute.name] = attribute.value
	})
	return props
}

/**
 * Extracts type information from TypeInfoToText components
 */
function extractTypeInfo({ getTypeDocs }) {
	return (tree) => {
		visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
			if (node.name === 'TypeInfoToText') {
				const {
					path,
					name: typeName,
					description: typeDesc,
				} = getProps(node.attributes)

				const { name, description = typeDesc } = getTypeDocs(
					join(LIB_PATH, 'dist', path),
					typeName
				)

				// @consideration: add properties and parameters
				parent.children.splice(
					index,
					1,
					{
						type: 'heading',
						depth: 4,
						attributes: {
							id: name,
						},
						children: [
							{
								type: 'text',
								value: name,
							},
						],
					},
					{
						type: 'text',
						value: '\n',
					},
					...node.children,
					{
						type: 'text',
						value: '\n',
					},
					{
						type: 'paragraph',
						children: [
							{
								type: 'text',
								value: description,
							},
						],
					}
				)
			}
		})
	}
}

/**
 * Parses an mdx page and returns searchable structured content
 */
async function structureMdxContent(text, id, route) {
	const getTypeDocs = (await import('../src/utils/getTypeDocs')).default

	const file = await unified()
		.use(parse, { fragment: true })
		.use(extractTypeInfo, { getTypeDocs })
		.use(rehype)
		.use(rehypeAutolinkHeadings)
		.use(slug)
		.use(gfm)
		.use(mdx)
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
				const slug = page.replace(/page\.mdx$/, '')
				const route = join(DOCS_DIR, slug)
				const text = fs.readFileSync(join(pathname, slug, 'page.mdx'), 'utf8')

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
