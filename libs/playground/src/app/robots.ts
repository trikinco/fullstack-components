import { MetadataRoute } from 'next'
import { URL_BASE, URL_DEPLOYMENT } from '../utils/constants'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${new URL('sitemap.xml', URL_DEPLOYMENT || URL_BASE)}`,
	}
}
