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
						Navigate the tech maze effortlessly with this AI-powered error
						decoder. Turn confusion into clarity and master the art of
						problem-solving.
					</Card>
				</Link>
				<Link href="/some-account">
					<Card title="Not Found">
						Don&apos;t get lost, get found! This AI-powered &apos;Not
						Found&apos; wizard is your map to missing web treasures. Discover
						what you were searching for in no time.
					</Card>
				</Link>
				<Link href="/text">
					<Card title="Text">
						Unleash the magic of simplicity with this AI-powered Text
						Transformer! Turn complex jargon into a breeze of understanding.
						Simplify and amplify your message with ease.
					</Card>
				</Link>
			</div>
		</main>
	)
}
