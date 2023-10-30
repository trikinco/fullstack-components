import { PageHeader } from '@/src/components/PageHeader'
import { NAME_LIB, NAME_SHORT } from '@/src/utils/constants'

export default function Page() {
	return (
		<>
			<PageHeader title={`Get started with ${NAME_SHORT}`} />

			<section>
				<h2 className="text-3xl">Installation</h2>
				<code className="mb-3 block">npm install {NAME_LIB}</code>
			</section>
		</>
	)
}
