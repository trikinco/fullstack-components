import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { visit } from 'unist-util-visit'
import theme from './src/assets/themes/css-variables.json' assert { type: 'json' }

/**
 * - remark-gfm to add support for GitHub Flavored Markdown
 */
export const remarkPlugins = [remarkGfm]

/**
 * - rehype-slug to add slugs to headings
 * - rehype-autolink-headings to add anchors to headings
 * - rehype-pretty-code to format code blocks
 */
export const rehypePlugins = [
	rehypeSlug,
	[
		rehypeAutolinkHeadings,
		{
			behavior: 'wrap',
			properties: {
				className: 'heading-link',
			},
		},
	],
	/**
	 * Pre-processing for enabling copy code buttons
	 *
	 * 1. parses `noCopy` meta string in code blocks to allow for toggling off the code-copy button
	 * @example
	 * page.mdx
	 * ```html noCopy
	 * <div>hello</div>
	 * ```
	 *
	 * 2. attaches raw content for pre nodes to use in a copy code button
	 */
	() => (tree) => {
		visit(tree, (node) => {
			if (node?.type !== 'element') return
			if (node?.tagName !== 'pre') return

			const [codeEl] = node.children

			if (codeEl.tagName !== 'code') return

			const meta = codeEl.data?.meta?.trim()

			// Disable copying if `noCopy` has been added to the code block meta string
			node.noCopy = /\bnoCopy/.test(meta)
			node.raw = codeEl.children?.[0].value
		})
	},
	[
		rehypePrettyCode,
		/**
		 * Use the 'css-variables' theme to enable easy custom styling for light and dark mode
		 * @note styles are defined in `src/styles/globals.css`
		 * @see {@link https://github.com/shikijs/shiki/blob/main/docs/themes.md#theming-with-css-variables theming with CSS variables}
		 */
		{
			theme,
			keepBackground: false,
		},
	],
	/**
	 * Post-processing for enabling copy code buttons after rehype pretty code syntax highlighting completes
	 * 1. Forwards `noCopy` meta as a boolean property
	 * 2. Forwards `raw` contents as a property to use in a copy code button
	 */
	() => (tree) => {
		visit(tree, (node) => {
			if (node?.type !== 'element') return
			if (node?.tagName !== 'figure') return
			if (!('data-rehype-pretty-code-figure' in node.properties)) return

			for (const child of node.children) {
				if (child.tagName === 'pre') {
					child.properties['noCopy'] = node.noCopy
					child.properties['raw'] = node.raw
				}
			}
		})
	},
]
