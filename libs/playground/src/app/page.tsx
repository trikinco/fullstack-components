import Link from 'next/link'
import Image from 'next/image'
import { Card } from '../components/Card'

export default function Home() {
	return (
		<>
			<main className="flex flex-col items-center justify-between p-6 md:p-24">
				<h1 className="text-5xl font-bold mb-16">
					AI-Powered Fullstack Components
				</h1>
				<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
					<Link href="/use-prompt" className="flex">
						<Card
							title="usePrompt"
							image={{
								src: '/images/DiamondSlim.png',
								alt: 'Diamond',
							}}
						>
							AI-Powered Prompt hook. Easily integrate prompts into any part of
							your application. Unlock the magic of words.
						</Card>
					</Link>
					<Link href="/errors" className="flex">
						<Card
							title="Errors"
							image={{
								src: '/images/Cone.png',
								alt: 'Cone',
							}}
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
						>
							AI-Powered Text Simplification. Transform any text into
							easy-to-understand information.
						</Card>
					</Link>
					<Link href="/select" className="flex">
						<Card
							title="Select"
							image={{
								src: '/images/MobiusStrip.png',
								alt: 'MobiusStrip',
							}}
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
						>
							AI-Powered Image Tools. Craft visuals effortlessly and reveal
							their secrets with instant image descriptions
						</Card>
					</Link>
				</div>
			</main>
			<footer className="flex py-3 px-6 bg-slate-100 dark:bg-slate-800 items-center">
				<div className="ml-auto flex gap-3">
					<span className="my-auto">Created by</span>
					<Link href="https://www.darraghoriordan.com">
						<Image
							className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-300 dark:bg-slate-600 dark:border-slate-600"
							src="/images/darragh.png"
							alt="Darragh ORiordan"
							width={40}
							height={40}
						/>
					</Link>
					<Link href="https://larsmagnus.co">
						<Image
							className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-200 dark:bg-slate-300 dark:border-slate-600"
							src="/images/lars.png"
							alt="Lars Klavenes"
							width={40}
							height={40}
						/>
					</Link>
					<Link href="https://www.connorthomsen.com">
						<Image
							className="w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-300 dark:bg-slate-600 dark:border-slate-600"
							src="/images/connor.png"
							alt="Connor Thomsen"
							width={40}
							height={40}
						/>
					</Link>
				</div>
			</footer>
		</>
	)
}
