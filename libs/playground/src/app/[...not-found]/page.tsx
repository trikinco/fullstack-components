import Link from 'next/link'
import { NotFoundEnhancer } from '@/src/modules/NotFoundEnhancer'
import { PageHeader } from '@/src/components/PageHeader'
import { Button } from '@/src/components/Button'
import Prose from '@/src/components/Prose'

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-between p-24 min-h-screen">
			<Prose>
				<PageHeader title="Not Found" />
				<p>Could not find requested resource</p>

				<Button as={Link} href="/" className="inline-flex w-auto">
					Return Home
				</Button>

				<NotFoundEnhancer />
			</Prose>
		</main>
	)
}
