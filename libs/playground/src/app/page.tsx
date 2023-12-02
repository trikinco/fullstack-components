import Link from 'next/link'
import { Main } from '@/src/components/Main'
import { Card } from '@/src/components/Card'
import { PageHeader } from '@/src/components/PageHeader'
import {
	NAME_SHORT,
	NAME_DESCRIPTION,
	META_AUTHORS,
	URL_GITHUB,
	URL_DEPLOYMENT,
	URL_LICENSE,
	URL_RELEASES,
	URL_DISCUSSIONS,
} from '@/src/utils/constants'
import { Button } from '@/src/components/Button'
import { IconPlay } from '@/src/components/Icons/IconPlay'
import { routes, routesDocsMeta, routesCardsMeta } from '@/src/utils/routes'
import { JsonSchema } from '@/src/modules/JsonSchema'

const META_AUTHORS_SCHEMA = META_AUTHORS.map((author) => ({
	...author,
	'@type': 'Person',
}))

const META_DOCS_SCHEMA = routesDocsMeta.map((meta) => ({
	'@type': 'WebPage',
	'@id': `${URL_DEPLOYMENT}${meta.href}`,
	name: meta.title,
	url: `${URL_DEPLOYMENT}${meta.href}`,
	isPartOf: {
		'@id': `${URL_DEPLOYMENT}${routes.docs}`,
	},
}))

export default function Home() {
	return (
		<Main>
			<JsonSchema
				type="SoftwareApplication"
				name={NAME_SHORT}
				description={NAME_DESCRIPTION}
				url={URL_DEPLOYMENT}
				id={URL_DEPLOYMENT}
				applicationCategory="DeveloperApplication"
				operatingSystem="Cross-platform"
				license={URL_LICENSE}
				releaseNotes={URL_RELEASES}
				discussionUrl={URL_DISCUSSIONS}
				author={META_AUTHORS_SCHEMA}
				keywords={[
					'npm library',
					'web development',
					'fullstack',
					'components',
					'next.js',
					'react',
					'ai',
				]}
				hasPart={[
					{
						'@type': 'WebPage',
						'@id': `${URL_DEPLOYMENT}${routes.docs}`,
						name: 'Documentation',
						url: `${URL_DEPLOYMENT}${routes.docs}`,
						isPartOf: {
							'@id': URL_DEPLOYMENT,
						},
						hasPart: META_DOCS_SCHEMA,
					},
				]}
			/>
			<div className="grid gap-6 lg:grid-cols-2 lg:mb-24 max-w-6xl">
				<PageHeader
					className="prose dark:prose-invert"
					headingProps={{ className: 'text-4xl sm:text-6xl' }}
					title={
						<>
							Build websites by
							<br />
							<span className="inline-flex justify-start">
								<span className="overflow-hidden leading-tight whitespace-nowrap my-0 mr-auto motion-safe:animate-typewriter motion-safe:after:w-[3px] motion-safe:after:h-[70%] motion-safe:after:inline-flex motion-safe:after:animate-writing">
									writing prompts.
								</span>
							</span>
						</>
					}
				>
					<p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-300">
						<strong className="dark:text-[#00FCCE]">{NAME_SHORT}</strong> is an
						AI-powered library for Next.js that turns words into fully
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
							href={routes.examples}
							color="secondary"
							variant="outlined"
						>
							<IconPlay className="mr-2" />
							Try it live
						</Button>
					</div>
				</PageHeader>
				{/* <div className="flex grow items-center justify-center gap-6">
					Some cool gif, demonstration or illustration goes here
				</div> */}
			</div>

			<section>
				<header className="grid text-center sm:text-left gap-6 w-full max-w-6xl mb-6 lg:mb-12">
					<h2 className="text-2xl font-bold">
						Check out the docs with live&nbsp;examples&nbsp;✨
					</h2>
				</header>

				<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full max-w-6xl">
					{routesCardsMeta.map(
						({ href, title, image, header, footer, children }) => (
							<article key={href} className="flex">
								<Card
									as={Link}
									href={href}
									title={title}
									image={image}
									header={header}
									footer={footer}
									component="h3"
								>
									<p className="text-sm sm:text-base">{children}</p>
								</Card>
							</article>
						)
					)}
				</div>
			</section>
		</Main>
	)
}
