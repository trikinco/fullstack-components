import { MetadataRoute } from 'next'
import { NAME_SHORT, NAME_LONG, NAME_DESCRIPTION } from '../utils/constants'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: NAME_LONG,
		short_name: NAME_SHORT,
		description: NAME_DESCRIPTION,
		start_url: '/',
		display: 'standalone',
		background_color: '#020617',
		theme_color: '#0f172a',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
			{
				src: '/favicon-1024.png',
				sizes: '1024x1024',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	}
}
