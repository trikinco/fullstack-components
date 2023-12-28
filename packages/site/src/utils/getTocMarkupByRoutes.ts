import fs from 'fs'
import { join } from 'path'
import { unified } from 'unified'
import parse from 'remark-parse'
import gfm from 'remark-gfm'
import slug from 'rehype-slug'
import toc from 'rehype-toc'
import stringify from 'rehype-stringify'
import rehype from 'remark-rehype'
import { select } from 'hast-util-select'
import { TOC_HEADINGS } from '@/src/utils/constants'
import type { Root } from 'hast'

export async function createTocMarkup(content: string) {
	let tocHtml = ''

	// Extract only the table of contents from the markdown
	const extractToc = () => {
		return (tree: any) => {
			const tocNode = select('.toc', tree) as unknown as Root

			if (tocNode) {
				tocHtml = unified().use(stringify).stringify(tocNode)
			}
		}
	}

	await unified()
		.use(parse, { fragment: true })
		.use(rehype)
		.use(gfm)
		.use(slug)
		.use(toc, { headings: TOC_HEADINGS, nav: false })
		.use(extractToc)
		.use(stringify)
		.process(content)

	return tocHtml
}

export function getFileContent({
	root = 'src/app',
	pathname,
	name,
}: {
	root?: string
	pathname: string
	name: string
}) {
	const path = join(process.cwd(), root, pathname, name)
	const file = fs.readFileSync(path, 'utf8')

	return file
}

async function getTocMarkup(pathname: string) {
	const content = getFileContent({ pathname, name: 'page.mdx' })
	return await createTocMarkup(content)
}

export async function getTocMarkupByRoutes(routes: Record<string, string>) {
	const tableOfContents = Object.values(routes).map((pathname) =>
		getTocMarkup(pathname).then((data) => ({ pathname, data }))
	)
	const toc = await Promise.all(tableOfContents)

	return toc.reduce(
		(acc, { pathname, data }) => {
			acc[pathname] = data
			return acc
		},
		{} as { [pathname: string]: string }
	)
}
