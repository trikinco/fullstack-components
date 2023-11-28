import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
	width: 32,
	height: 32,
}
export const contentType = 'image/png'

/**
 * Favicon image generatio
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx | Generate icons using code}
 */
export default function Icon() {
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<svg
				viewBox="0 0 572 512"
				width={size.width}
				height={size.height}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#a)">
					<path d="M60 0h512l-60 512H0L60 0Z" fill="#000" />
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M141 238.071h85.69l-33.664 153.16c-.816 4.492-1.428 8.168-1.836 11.027-.408 2.451-.612 5.31-.612 8.577 0 10.211 1.836 19.4 5.508 27.569 3.673 8.168 8.569 15.112 14.69 20.83 6.121 5.718 13.261 10.006 21.422 12.865 8.161 3.267 16.73 4.901 25.707 4.901 17.546 0 34.072-5.31 49.578-15.929l88.75-60.038-38.561-57.588-82.017 56.363-6.121-4.289 34.276-157.448H425v-72.903H141v72.903Zm185.053-103.535L347.879 31h-77.12l-21.827 103.536h77.121Z"
						fill="#fff"
					/>
				</g>
				<defs>
					<clipPath id="a">
						<path fill="#fff" d="M0 0h572v512H0z" />
					</clipPath>
				</defs>
			</svg>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		}
	)
}
