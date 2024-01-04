'use server'
import fs from 'fs'
import { join } from 'path'
import { unified } from 'unified'
import parse from 'remark-parse'
import gfm from 'remark-gfm'
import stringify from 'rehype-stringify'
import rehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { parseHtmlString } from '@/src/utils/html'
import { findInDir } from '@/src/utils/files'

type StructuredSection = {
	id: string
	title: string
	content: string[]
}

export type StructuredPageContent = {
	id: string
	title: string
	route: string
	content: StructuredSection[]
}

/**
 * Parses an mdx page and returns searchable structured content
 */
export async function structureMdxContent(
	text: string,
	id: string,
	route: string
): Promise<StructuredPageContent> {
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
 * Create structured data for search from a virtual DOM body
 */
function structurePage(body: HTMLElement) {
	const title = body.querySelector('h1')?.textContent || ''
	const content: StructuredSection[] = []
	let currentSection: StructuredSection | null = null

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
 * Gets structured data from .mdx pages.
 * This structured data is much easier and faster to search than a whole, unprocessed doc/page
 */
export async function getMdxPagesContent({
	basePath = 'src/app',
	pathname,
	filter = /\.mdx?$/,
}: {
	basePath?: string
	pathname: string
	filter?: RegExp
}) {
	const path = join(process.cwd(), basePath, pathname)
	const pages = findInDir(path, filter)

	const contentPromises = pages.map(async (page) => {
		const route = page.split(basePath)?.pop()?.replace('/page.mdx', '') || ''
		const id = page.replace('/page.mdx', '').split('/').pop() || ''
		const text = fs.readFileSync(page, 'utf8')

		return await structureMdxContent(text, id, route)
	})

	return await Promise.all(contentPromises)
}
