import Link from 'next/link'
import { Main } from '@/src/components/Main'
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
import { Cards } from '@/src/modules/Cards'
import { IconSparkles } from '@/src/components/Icons/IconSparkles'
import { IconCode } from '@/src/components/Icons/IconCode'
import { IconEye } from '@/src/components/Icons/IconEye'
import { IconPlay } from '@/src/components/Icons/IconPlay'
import { merge } from '@trikinco/fullstack-components/utils'

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

			<Hero className="w-full max-w-6xl mb-0" />

			<section className="mt-16 lg:mt-20 2xl:mt-32">
				<header
					className={merge(
						'mb-6 lg:mb-12 2xl:mb-16',
						'grid gap-6 xl:gap-8',
						'w-full max-w-6xl'
					)}
				>
					<h2 className="relative z-10 text-2xl sm:text-3xl xl:text-4xl !leading-[1.4] text-pretty">
						<IconSparkles
							width={28}
							height={28}
							className="inline w-6 h-6 lg:w-7 lg:h-7 mr-1 text-pink-500"
							aria-hidden="true"
						/>
						<strong className="font-bold">AI-powered building blocks</strong>{' '}
						for{' '}
						<IconCode
							width={28}
							height={28}
							className="inline w-6 h-6 lg:w-7 lg:h-7 mr-1 text-blue-500 dark:text-primary"
							aria-hidden="true"
						/>
						<strong className="font-bold">developers</strong>, a toolkit to
						embed{' '}
						<IconEye
							width={28}
							height={28}
							className="inline w-6 h-6 lg:w-7 lg:h-7 mr-1 text-pink-500"
							aria-hidden="true"
						/>
						<strong className="font-bold">intelligent features</strong> in your
						product{' '}
						<Link href={routes.docs}>
							and <span className="underline">docs</span> with{' '}
							<IconPlay
								width={28}
								height={28}
								className="inline w-6 h-6 lg:w-7 lg:h-7 mr-1 text-blue-500 dark:text-primary"
								aria-hidden="true"
							/>
							<strong className="font-bold">live&nbsp;examples.</strong>
						</Link>
					</h2>
				</header>

				<Cards routes={routesCardsMeta} className="md:grid-cols-3" />
			</section>
		</Main>
	)
}
