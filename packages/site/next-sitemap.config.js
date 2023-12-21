function getPriorityByPath(config, path) {
	switch (path) {
		case '/':
			return '1.0'
		case '/docs/get-started':
			return '0.9'
		case '/docs':
			return '0.7'
		case '/examples':
			return '0.6'
		default:
			return config.priority
	}
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000/',
	generateIndexSitemap: false,
	exclude: ['/robots.txt', '/manifest.webmanifest'],
	changefreq: 'monthly',
	transform: async (config, path) => {
		const priority = getPriorityByPath(config, path)
		let changefreq = config.changefreq

		if (path.includes('docs/')) {
			changefreq = 'weekly'
		}

		return {
			loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
			changefreq,
			priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
			alternateRefs: config.alternateRefs ?? [],
		}
	},
}
