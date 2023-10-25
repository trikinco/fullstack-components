import Link from 'next/link'
import { NotFoundEnhancer } from '../components/NotFoundEnhancer'
import { Suspense } from 'react'

export default async function NotFound() {

	return (
		<div>
			<h1>Not found – 404!</h1>
			<div>
				<Link href="/">Go back to Home</Link>
			</div>
		
				<NotFoundEnhancer />
		
		</div>
	)
}
