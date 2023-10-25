import Link from 'next/link'
import { Card } from '../components/Card'

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between p-24">
			<h1 className="text-4xl font-bold mb-8">
				AI-powered fullstack components
			</h1>
			<div className="grid gap-4 grid-cols-2">
				<Link href="/errors">
					<Card title="Errors">
						AI-Powered Error Helper. Makes sense of complex technical errors.
						Turn confusion into clarity.
					</Card>
				</Link>
				<Link href="/some-account">
					<Card title="Not Found">
						AI-Powered Page Not Found. Get help finding the page you were
						looking for. Don&apos;t get lost, get found!
					</Card>
				</Link>
				<Link href="/text">
					<Card title="Text">
						AI-Powered Text Simplification. Transform any text into
						easy-to-understand information.
					</Card>
				</Link>
			</div>
		</main>
	)
}
