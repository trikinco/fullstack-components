import { getImage } from '@trikinco/fullstack-components'

export default async function Page() {
	const response = await getImage({
		prompt:
			'An ethereal landscape in a far away fantasy land, natural light, golden hour',
	})

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={response}
			alt="An ethereal landscape in a far away fantasy land"
			width="256"
			height="256"
		/>
	)
}
