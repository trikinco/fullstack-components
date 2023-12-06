import { MetadataRoute } from 'next'
import { URL_HOST } from '../utils/constants'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${new URL('sitemap.xml', URL_HOST)}`,
	}
}
