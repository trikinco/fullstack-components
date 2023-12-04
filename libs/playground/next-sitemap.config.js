/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000/',
	generateIndexSitemap: false,
	exclude: ['/robots.txt', '/manifest.webmanifest'],
}
