import { unified, type Processor } from 'unified'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkRehype from 'remark-rehype'
import { CodeBlock } from '../components/CodeBlock'

/**
 * Converts a vfile/string into HTML.
 * Highlights code with rehype-pretty-code
 */
export function markdownToHtml(file: Parameters<Processor['process']>[0]) {
	return unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrettyCode, {
			theme: 'css-variables',
		})
		.use(rehypeStringify)
		.process(file)
}

/**
 * Default components to use for
 * Remote and local mdx
 */
export const defaultComponents = {
	pre: CodeBlock,
}
