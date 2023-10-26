import Link from 'next/link'
import { NotFoundEnhancer } from '@/src/components/NotFoundEnhancer'

export default function NotFound() {
	return (
		<div>
			<h1>Not Found</h1>
			<p>Could not find requested resource</p>
			<Link href="/">Return Home</Link>

			<NotFoundEnhancer />
		</div>
	)
}
