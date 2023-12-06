import { getBlock } from '../../../../../fullstack-components/dist'

export default async function Page() {
	const response = await getBlock({
		prompt:
			"A navbar with a modern SVG logo, the title 'myProject' and some links. Dark bg, light text.",
	})

	return <div>{response.responseText}</div>
}
