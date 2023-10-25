import sitemapper from 'sitemapper'
let sitemapCache: string = ''

export async function sitemapFromCache(currentHost: string) {
	if (sitemapCache.length === 0) {
		sitemapCache = (await loadAndParseSitemapToListOfUrls(currentHost)).join(
			',\n'
		)
	}
	console.log('sitemapCache', sitemapCache)
	return sitemapCache
}

async function loadAndParseSitemapToListOfUrls(
	currentHost: string
): Promise<string[]> {
	// load sitemap
	const localSitemap = new sitemapper({
		url: currentHost + '/sitemap.xml',
		timeout: 15000,
	})
	const contents = await localSitemap.fetch()
	console.log('currentHost', currentHost)
	console.log('contents', contents)
	return contents.sites
}
