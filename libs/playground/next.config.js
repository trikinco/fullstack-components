/** @type {import('next').NextConfig} */
const nextConfig = {
	// just used for testing useEffect works as expected
	// reactStrictMode: false
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

module.exports = nextConfig
