import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit'

/**
 * - rehype-slug to add slugs to headings
 * - rehype-autolink-headings to add anchors to headings
 * - rehype-pretty-code to format code blocks
 * - remark-gfm to add support for GitHub Flavored Markdown
 */
const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, { behavior: 'append' }],
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

					if (!/\bnoCopy/.test(meta)) {
						node.noCopy = true
					}

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
					theme: 'css-variables',
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
					if (node?.tagName !== 'div') return
					if (!('data-rehype-pretty-code-fragment' in node.properties)) return

					for (const child of node.children) {
						if (child.tagName === 'pre') {
							child.properties['noCopy'] = node.noCopy
							child.properties['raw'] = node.raw
						}
					}
				})
			},
		],
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	// just used for testing useEffect works as expected
	// reactStrictMode: false
	// The Rust-based mdx compiler is commented out as it doesn't support remark and rehype plugins yet
	// experimental: {
	// 	/**
	// 	 * For use with @next/mdx. Compile MDX files using the new Rust compiler.
	// 	 * @see {@link https://nextjs.org/docs/app/api-reference/next-config-js/mdxRs mdxRs}
	// 	 */
	// 	mdxRs: true,
	// },
	// Include md and mdx for generating pages
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	/**
	 * Configure remote image patterns
	 * for the Image demo
	 */
	images: {
		remotePatterns: [
			// Image description
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org',
			},
			// Image creation
			{
				protocol: 'https',
				hostname: 'oaidalleapiprodscus.blob.core.windows.net',
			},
		],
	},
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
