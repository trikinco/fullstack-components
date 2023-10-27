import Link from 'next/link'
import { Card } from '../components/Card'

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between p-24">
			<h1 className="text-5xl font-bold mb-16">
				AI-Powered Fullstack Components
			</h1>
			<div className="grid gap-6 grid-cols-2">
				<Link href="/use-prompt" className="flex">
					<Card title="usePrompt">
						AI-Powered Prompt hook. Easily integrate prompts into any part of
						your application. Unlock the magic of words.
					</Card>
				</Link>
				<Link href="/errors" className="flex">
					<Card title="Errors">
						AI-Powered Error Helper. Makes sense of complex technical errors.
						Turn confusion into clarity.
					</Card>
				</Link>
				<Link href="/some-account" className="flex">
					<Card title="Not Found">
						AI-Powered <i>Page Not Found</i>. Get help finding the page you were
						looking for. Don&apos;t get lost, get found!
					</Card>
				</Link>
				<Link href="/text" className="flex">
					<Card title="Text">
						AI-Powered Text Simplification. Transform any text into
						easy-to-understand information.
					</Card>
				</Link>
				<Link href="/select" className="flex">
					<Card title="Select">
						AI-Powered Select Options Generator. Create options for your
						dropdowns.
					</Card>
				</Link>
				<Link href="/image" className="flex">
					<Card title="Image">
						AI-Powered Image Tools. Craft visuals effortlessly and reveal their
						secrets with instant image descriptions
					</Card>
				</Link>
			</div>
		</main>
	)
}
