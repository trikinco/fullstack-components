import Link from 'next/link'
import Main from '@/src/components/Main'
import { Card } from '@/src/components/Card'
import { Chip } from '@/src/components/Chip'
import { PageHeader } from '@/src/components/PageHeader'
import { NAME_SHORT, URL_GITHUB } from '@/src/utils/constants'
import { Button } from '@/src/components/Button'
import { IconGitHub } from '@/src/components/Icons/IconGitHub'
import { routes } from '@/src/utils/routes'

const imageSize = {
	width: 1000,
	height: 1000,
}

export default function Home() {
	return (
		<Main>
			<div className="grid gap-6 lg:grid-cols-2 mb-24 max-w-6xl">
				<PageHeader
					className="prose dark:prose-invert"
					headingProps={{ className: 'text-4xl sm:text-6xl' }}
					title={
						<>
							Build websites by
							<br />
							<span className="inline-flex justify-start">
								<span className="overflow-hidden leading-tight whitespace-nowrap my-0 mr-auto motion-safe:animate-typewriter motion-safe:after:border-r-2 motion-safe:after:animate-writing">
									writing prompts.
								</span>
							</span>
						</>
					}
				>
					<p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-300">
						<strong>{NAME_SHORT}</strong> is an AI-powered library for Next.js
						that turns words into fully integrated components, like magic.
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

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
				<Card
					as={Link}
					href={routes.prompt}
					title="Prompt"
					image={{
						src: '/images/InfinityStrip.png',
						alt: 'Infinity',
						...imageSize,
					}}
					footer={
						<>
							<Chip>Component</Chip>
							<Chip>Hook</Chip>
						</>
					}
				>
					Easily integrate AI prompts into any part of your application.
				</Card>
				<Card
					as={Link}
					href={routes.errors}
					title="Error Enhancer"
					image={{
						src: '/images/Cone.png',
						alt: 'Cone',
						...imageSize,
					}}
					footer={
						<>
							<Chip>Component</Chip>
							<Chip>Hook</Chip>
						</>
					}
				>
					AI-Powered Error Enhancer. Debug and make sense of technical errors.
				</Card>
				<Card
					as={Link}
					href={routes.notFound}
					title="Not Found Enhancer"
					image={{
						src: '/images/Disc.png',
						alt: 'Disc',
						...imageSize,
					}}
					footer={
						<>
							<Chip>Hook</Chip>
						</>
					}
				>
					AI-Powered <i>Page Not Found</i>. Get help finding the page you were
					looking for.
				</Card>
				<Card
					as={Link}
					href={routes.htmlPage}
					title="HTML page"
					image={{
						src: '/images/MobiusStrip.png',
						alt: 'MobiusStrip',
						...imageSize,
					}}
					footer={
						<>
							<Chip>Hook</Chip>
						</>
					}
				>
					AI-Powered HTML page generation. Designs and codes full pages.
				</Card>
				<Card
					as={Link}
					href={routes.block}
					title="Block"
					image={{
						src: '/images/WireframeCube.png',
						alt: 'A wireframe cube',
						...imageSize,
					}}
					footer={
						<>
							<Chip>Component</Chip>
							<Chip>Hook</Chip>
						</>
					}
				>
					AI React Components. Prompt goes in, component comes out.
				</Card>
				<Card
					as={Link}
					href={routes.image}
					title="Image"
					image={{
						src: '/images/Asterisk.png',
						alt: 'Asterisk',
						...imageSize,
					}}
					footer={
						<>
							<Chip>Component</Chip>
							<Chip>Hook</Chip>
						</>
					}
				>
					AI creates images with prompts or generates image descriptions.
				</Card>
				<Card
					as={Link}
					href={routes.select}
					title="Select"
					image={{
						src: '/images/DiamondSlim.png',
						alt: 'Diamond',
						...imageSize,
					}}
					footer={
						<>
							<Chip>Component</Chip>
							<Chip>Hook</Chip>
						</>
					}
				>
					AI creates, sorts and labels dropdowns or lists of content.
				</Card>
				<Card
					as={Link}
					href={routes.text}
					title="Text"
					image={{
						src: '/images/Cube.png',
						alt: 'Cube',
						...imageSize,
					}}
					footer={
						<>
							<Chip>Component</Chip>
							<Chip>Hook</Chip>
						</>
					}
				>
					AI transforms, creates or modifies text, markdown or HTML.
				</Card>
				<Card
					as={Link}
					href={routes.chat}
					title="Chat"
					image={{
						src: '/images/Wedge.png',
						alt: 'Wedge',
						...imageSize,
					}}
					header={
						<Chip className="bg-orange-100 border-orange-200 dark:bg-orange-950 dark:border-orange-900">
							Demo
						</Chip>
					}
					footer={
						<>
							<Chip>Component</Chip>
							<Chip>Hook</Chip>
						</>
					}
				>
					Everything you need to create fully integrated, custom chat
					experiences.
				</Card>
			</div>
		</Main>
	)
}
