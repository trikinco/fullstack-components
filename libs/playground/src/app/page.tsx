import Link from 'next/link'
import { Card } from '../components/Card'
import { Chip } from '../components/Chip'

export default function Home() {
	return (
		<>
			<main className="flex flex-col items-center justify-between p-6 md:p-24">
				<h1 className="text-5xl font-bold mb-16">
					AI-Powered Fullstack Components
				</h1>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<Link href="/use-prompt" className="flex">
						<Card
							title="usePrompt"
							image={{
								src: '/images/InfinityStrip.png',
								alt: 'Infinity',
							}}
							footer={<Chip>Hook</Chip>}
						>
							AI-Powered Prompt hook. Easily integrate prompts into any part of
							your application. Unlock the magic of words.
						</Card>
					</Link>
					<Link href="/errors" className="flex">
						<Card
							title="Error"
							image={{
								src: '/images/Cone.png',
								alt: 'Cone',
							}}
							footer={<Chip>Tools</Chip>}
						>
							AI-Powered Error Helper. Makes sense of complex technical errors.
							Turn confusion into clarity.
						</Card>
					</Link>
					<Link href="/some-account" className="flex">
						<Card
							title="Not Found"
							image={{
								src: '/images/Disc.png',
								alt: 'Disc',
							}}
							footer={<Chip>Component</Chip>}
						>
							AI-Powered <i>Page Not Found</i>. Get help finding the page you
							were looking for. Don&apos;t get lost, get found!
						</Card>
					</Link>
					<Link href="/text" className="flex">
						<Card
							title="Text"
							image={{
								src: '/images/Cube.png',
								alt: 'Cube',
							}}
							footer={<Chip>Component</Chip>}
						>
							AI-Powered Text Simplification. Transform any text into
							easy-to-understand information.
						</Card>
					</Link>
					<Link href="/select" className="flex">
						<Card
							title="Select"
							image={{
								src: '/images/DiamondSlim.png',
								alt: 'Diamond',
							}}
							footer={<Chip>Component</Chip>}
						>
							AI-Powered Select Options Generator. Create options for your
							dropdowns.
						</Card>
					</Link>
					<Link href="/image" className="flex">
						<Card
							title="Image"
							image={{
								src: '/images/Asterisk.png',
								alt: 'Asterisk',
							}}
							footer={<Chip>Component</Chip>}
						>
							AI-Powered Image Tools. Craft visuals effortlessly and reveal
							their secrets with instant image descriptions.
						</Card>
					</Link>
				</div>
			</main>
		</>
	)
}
