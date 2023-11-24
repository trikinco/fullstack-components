import Link from 'next/link'
import Main from '@/src/components/Main'
import Prose from '@/src/components/Prose'
import { PageHeader } from '@/src/components/PageHeader'
import { Button } from '@/src/components/Button'
import { NotFoundEnhancer } from '@/src/app/docs/not-found/NotFoundEnhancer'

export default function NotFound() {
	return (
		<Main>
			<Prose>
				<PageHeader title="Not Found" />
				<p>Could not find requested resource</p>

				<Button as={Link} href="/" className="inline-flex w-auto">
					Return Home
				</Button>

				<NotFoundEnhancer />
			</Prose>
		</Main>
	)
}
