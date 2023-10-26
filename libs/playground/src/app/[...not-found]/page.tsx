import Link from 'next/link'
import { NotFoundEnhancer } from '@/src/components/NotFoundEnhancer'

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-between p-24">
			<h1 className="text-5xl font-bold mb-16">Not Found</h1>
			<p>Could not find requested resource</p>
			<Link className="mt-3" href="/">
				Return Home
			</Link>

			<NotFoundEnhancer />
		</div>
	)
}
