/* eslint-disable @typescript-eslint/naming-convention */
import NextImage from 'next/image'
import type { ImageGenerateProps } from '../../types/Image'

/**
 * Shows a generated Image
 */
export function ImageGeneration(
	props: ImageGenerateProps & { response?: string }
) {
	const {
		response,
		prompt,
		size = '256x256',
		/* eslint-disable @typescript-eslint/no-unused-vars */
		showResult,
		imageQuality,
		imageStyle,
		model,
		response_format,
		user,
		/* eslint-enable @typescript-eslint/no-unused-vars */
		...rest
	} = props || {}
	const sizes = size?.split('x')
	const width = Number.parseInt(sizes?.[0] || '')
	const height = Number.parseInt(sizes?.[1] || '')

	return (
		<>
			<NextImage
				src={`data:image/png;base64,${response || ''}`}
				alt={prompt || ''}
				width={width}
				height={height}
				{...rest}
			/>
			{showResult && response}
		</>
	)
}

export default ImageGeneration
