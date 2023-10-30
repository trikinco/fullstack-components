import Link from 'next/link'
import { Card } from '../components/Card'
import { Chip } from '../components/Chip'
import { PageHeader } from '../components/PageHeader'
import { NAME_LONG, NAME_SHORT, URL_GITHUB } from '../utils/constants'
import { Button } from '../components/Button'
import { IconGitHub } from '../components/Icons/IconGitHub'

// .typewriter h1 {
// 	overflow: hidden; /* Ensures the content is not revealed until the animation */
// 	border-right: .15em solid orange; /* The typwriter cursor */
// 	white-space: nowrap; /* Keeps the content on a single line */
// 	margin: 0 auto; /* Gives that scrolling effect as the typing happens */
// 	letter-spacing: .15em; /* Adjust as needed */
// 	animation:
// 	  typing 3.5s steps(40, end),
// 	  blink-caret .75s step-end infinite;
//   }

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
						{NAME_SHORT} is an AI-powered framework that turns words into fully
						integrated components, like magic.
					</p>
					<p className="text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-300">
						Responsible, customizable and open source.
					</p>
					<div className="mt-8 flex grow items-center gap-6">
						<Button className="dark:bg-white dark:hover:bg-white/90 dark:text-slate-900">
							Get started
						</Button>
						<Button
							as={Link}
							href={URL_GITHUB}
							className="no-underline bg-transparent hover:bg-white/20 text-slate-900 border-2 border-slate-900 dark:bg-slate-900 dark:hover:bg-white/20 dark:border-white dark:text-white"
						>
							<IconGitHub className="mr-2" />
							GitHub
						</Button>
					</div>
				</PageHeader>
				<div className="flex grow items-center justify-center gap-6">
					Some cool gif, demonstration or illustration goes here
				</div>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
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
						AI-Powered <i>Page Not Found</i>. Get help finding the page you were
						looking for. Don&apos;t get lost, get found!
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
						AI-Powered Image Tools. Craft visuals effortlessly and reveal their
						secrets with instant image descriptions.
					</Card>
				</Link>
			</div>
		</main>
	)
}
