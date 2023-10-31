import { ImageResponse } from 'next/og'
import { NAME_LONG } from '../utils/constants'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = NAME_LONG
export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png'

/**
 * Image generation for opengraph-image and twitter-image
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx generate images using code}
 *
 * @returns
 * <meta property="og:image" content="<generated>" />
 * <meta property="og:image:alt" content="<the content below>" />
 * <meta property="og:image:type" content="image/png" />
 * <meta property="og:image:width" content="1200" />
 * <meta property="og:image:height" content="630" />
 */
export default async function Image() {
	const spaceGroteskBold = fetch(
		new URL('../assets/fonts/SpaceGroteskBold.ttf', import.meta.url)
	).then((res) => res.arrayBuffer())

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					fontSize: 128,
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{NAME_LONG}
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			fonts: [
				{
					name: 'Space Grotesk',
					data: await spaceGroteskBold,
					style: 'normal',
					weight: 700,
				},
			],
		}
	)
}
