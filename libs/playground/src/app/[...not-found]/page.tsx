import Link from 'next/link'
import { NotFoundEnhancer } from '@/src/components/NotFoundEnhancer'
import { PageHeader } from '@/src/components/PageHeader'
import { Button } from '@/src/components/Button'

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-between p-24 min-h-screen">
			<div className="prose dark:prose-invert mx-auto">
				<PageHeader title="Not Found" />
				<p>Could not find requested resource</p>

				<Button as={Link} href="/" className="inline-flex w-auto">
					Return Home
				</Button>

				<NotFoundEnhancer />
			</div>
		</main>
	)
}
