import Link from 'next/link'
import { Main } from '@/src/components/Main'
import { Card } from '@/src/components/Card'
import { PageHeader } from '@/src/components/PageHeader'
import { NAME_SHORT, URL_GITHUB } from '@/src/utils/constants'
import { Button } from '@/src/components/Button'
import { IconGitHub } from '@/src/components/Icons/IconGitHub'
import { routesCardsMeta } from '@/src/utils/routes'

export default function Home() {
	return (
		<Main>
			<div className="grid gap-6 lg:grid-cols-2 lg:mb-24 max-w-6xl">
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

			<section>
				<header className="grid text-center sm:text-left gap-6 w-full max-w-6xl mb-12">
					<h2 className="text-2xl font-bold">
						Check out these live examples ✨
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
