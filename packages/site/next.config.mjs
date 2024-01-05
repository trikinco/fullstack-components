import createMDX from '@next/mdx'
import { remarkPlugins, rehypePlugins } from './mdx-config.mjs'

/**
 * - rehype-slug to add slugs to headings
 * - rehype-autolink-headings to add anchors to headings
 * - rehype-pretty-code to format code blocks
 * - remark-gfm to add support for GitHub Flavored Markdown
 */
const withMDX = createMDX({ options: { remarkPlugins, rehypePlugins } })

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		// urlImports: ['https://esm.sh/'],
		outputFileTracingIncludes: {
			'/**/*': ['./src/app/docs/**/*'],
		},
	},
	// just used for testing useEffect works as expected
	// reactStrictMode: false,
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
	async redirects() {
		return [
			{
				source: '/docs',
				destination: '/docs/get-started',
				permanent: true,
			},
		]
	},
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
