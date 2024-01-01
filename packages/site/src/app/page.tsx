import Link from 'next/link'
import { Main } from '@/src/components/Main'
import { Card } from '@/src/components/Card'
import {
	NAME_SHORT,
	NAME_DESCRIPTION,
	META_AUTHORS,
	URL_HOST,
	URL_LICENSE,
	URL_RELEASES,
	URL_DISCUSSIONS,
} from '@/src/utils/constants'
import { routes, routesDocsMeta, routesCardsMeta } from '@/src/utils/routes'
import { JsonSchema } from '@/src/modules/JsonSchema'
import { Hero } from '@/src/modules/Hero'

export const metadata = {
	alternates: {
		canonical: URL_HOST,
	},
}

const META_AUTHORS_SCHEMA = META_AUTHORS.map((author) => ({
	...author,
	'@type': 'Person',
}))

const META_DOCS_SCHEMA = routesDocsMeta.map((meta) => ({
	'@type': 'WebPage',
	'@id': `${URL_HOST}${meta.href}`,
	name: meta.title,
	url: `${URL_HOST}${meta.href}`,
	isPartOf: {
		'@id': `${URL_HOST}${routes.docs}`,
	},
}))

export default function Home() {
	return (
		<Main>
			<JsonSchema
				type="SoftwareApplication"
				name={NAME_SHORT}
				description={NAME_DESCRIPTION}
				url={URL_HOST}
				id={URL_HOST}
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
						'@id': `${URL_HOST}${routes.docs}`,
						name: 'Documentation',
						url: `${URL_HOST}${routes.docs}`,
						isPartOf: {
							'@id': URL_HOST,
						},
						hasPart: META_DOCS_SCHEMA,
					},
				]}
			/>
			<div className="grid gap-6 lg:grid-cols-2 lg:mb-24 max-w-6xl">
				<Hero />
			</div>

			<section>
				<header className="grid text-center sm:text-left gap-6 w-full max-w-6xl mb-6 lg:mb-12">
					<h2 className="text-2xl font-bold">
						<Link href={routes.docs}>
							Check out the docs with live&nbsp;examples&nbsp;✨
						</Link>
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
