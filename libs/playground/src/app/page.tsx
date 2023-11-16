import Link from 'next/link'
import { Card } from '../components/Card'
import { Chip } from '../components/Chip'
import { PageHeader } from '../components/PageHeader'
import { NAME_SHORT, URL_GITHUB } from '../utils/constants'
import { Button } from '../components/Button'
import { IconGitHub } from '../components/Icons/IconGitHub'

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between p-6 md:p-24 min-h-screen">
			<div className="grid gap-6 lg:grid-cols-2 mb-24 max-w-6xl">
				<PageHeader
					className="prose dark:prose-invert"
					headingProps={{ className: 'text-6xl' }}
					title={
						<>
							Build websites by
							<br />
							<span className="inline-flex justify-start">
								<span className="overflow-hidden whitespace-nowrap my-0 mr-auto motion-safe:animate-typewriter motion-safe:after:border-r-2 motion-safe:after:animate-writing">
									writing prompts.
								</span>
							</span>
						</>
					}
				>
					<p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-300">
						{NAME_SHORT} is an AI-powered library that turns words into fully
						integrated components, like magic.
					</p>
					<p className="text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-300">
						Responsible, customizable and open source.
					</p>
					<div className="mt-8 flex grow items-center gap-6">
						<Button as={Link} href="/docs/get-started">
							Get started
						</Button>
						<Button
							as={Link}
							href={URL_GITHUB}
							color="secondary"
							variant="outlined"
						>
							<IconGitHub className="mr-2" />
							GitHub
						</Button>
					</div>
				</PageHeader>
				{/* <div className="flex grow items-center justify-center gap-6">
					Some cool gif, demonstration or illustration goes here
				</div> */}
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
				<Card
					as={Link}
					href="/use-prompt"
					title="usePrompt"
					image={{
						src: '/images/InfinityStrip.png',
						alt: 'Infinity',
					}}
					footer={<Chip>Hook</Chip>}
				>
					AI-Powered Prompt hook. Easily integrate prompts into any part of your
					application. Unlock the magic of words.
				</Card>
				<Card
					as={Link}
					href="/errors"
					title="Error"
					image={{
						src: '/images/Cone.png',
						alt: 'Cone',
					}}
					footer={<Chip>Tools</Chip>}
				>
					AI-Powered Error Helper. Makes sense of complex technical errors. Turn
					confusion into clarity.
				</Card>
				<Card
					as={Link}
					href="/some-account"
					title="Not Found"
					image={{
						src: '/images/Disc.png',
						alt: 'Disc',
					}}
					footer={<Chip>Component</Chip>}
				>
					AI-Powered <i>Page Not Found</i>. Get help finding the page you were
					looking for. Don&apos;t get lost, get found!
				</Card>
				<Card
					as={Link}
					href="/ui"
					title="Generate UI"
					image={{
						src: '/images/MobiusStrip.png',
						alt: 'MobiusStrip',
					}}
					footer={
						<>
							<Chip>Component</Chip>
							<Chip>Hook</Chip>
						</>
					}
				>
					AI-Powered Generative UI. Design, create, and innovate. Transform code
					into stunning user interfaces easily.
				</Card>
				<Card
					as={Link}
					href="/ui/block"
					title="Block"
					image={{
						src: '/images/WireframeCube.png',
						alt: 'A wireframe cube',
					}}
					footer={
						<>
							<Chip>Component</Chip>
						</>
					}
				>
					AI-Powered Generative UI. Prompt goes in, UI comes out. Easy.
				</Card>
				<Card
					as={Link}
					href="/chat"
					title="Chat toolkit"
					image={{
						src: '/images/Wedge.png',
						alt: 'Wedge',
					}}
					footer={
						<>
							<Chip>Component</Chip>
							<Chip>Hook</Chip>
						</>
					}
				>
					AI-Powered Chat Interface Toolkit. Everything you need to create fully
					integrated, custom chat experiences.
				</Card>
				<Card
					as={Link}
					href="/text"
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
				<Card
					as={Link}
					href="/select"
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
				<Card
					as={Link}
					href="/image"
					title="Image"
					image={{
						src: '/images/Asterisk.png',
						alt: 'Asterisk',
					}}
					footer={<Chip>Component</Chip>}
				>
					AI-Powered Image Tools. Craft visuals effortlessly and reveal their
					secrets with instant image descriptions.
				</Card>
			</div>
		</main>
	)
}
