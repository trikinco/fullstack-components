/* eslint-disable jsx-a11y/alt-text */
import { Image } from '@trikinco/fullstack-components'

export default async function Page() {
	return (
		<div>
			{/* Describing an image */}
			<Image
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/179px-Felis_catus-cat_on_snow.jpg"
				width={256}
				height={170}
			/>
			{/* Generating an image */}
			<Image
				prompt="A photograph of a cat wearing a cowboy hat"
				model="dall-e-3"
				size="1024x1024"
			/>
		</div>
	)
}
