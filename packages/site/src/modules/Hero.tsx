'use client'

import { TypeAnimation } from 'react-type-animation'
import Link from 'next/link'
import { PageHeader } from '@/src/components/PageHeader'
import { NAME_SHORT } from '@/src/utils/constants'
import { Button } from '@/src/components/Elements/Button'
import { IconPlay } from '@/src/components/Icons/IconPlay'
import { routes } from '@/src/utils/routes'

export function Hero() {
	return (
		<PageHeader
			className="prose dark:prose-invert"
			headingProps={{
				className: 'text-4xl sm:text-5xl xl:text-6xl mt-6 mb-6 xl:mt-0 sm:mb-3',
			}}
			title={
				<>
					<span className="sr-only">Build websites by writing prompts.</span>
					<TypeAnimation
						aria-hidden="true"
						className="block break-all whitespace-pre-line h-[86px] sm:h-[109px] xl:h-[137px]"
						preRenderFirstString
						speed={30}
						deletionSpeed={20}
						sequence={[
							'Build websites by \nwriting prompts.',
							700,
							'Build websites by \nusing AI.',
							3000,
							'Build websites by \nusing <Prompt />',
							1250,
							'Build websites by \nusing <Audio />',
							1400,
							'Build websites by \nusing <Text />',
							1300,
							'Build websites by \nusing <Image />',
							3000,
							'Build websites by \nwriting prompts.',
						]}
					/>
				</>
			}
		>
			<p className="mt-6 text-lg max-w-3xl mx-auto text-slate-600 dark:text-white">
				<strong className="dark:text-[#00FCCE]">{NAME_SHORT}</strong> is an
				AI-powered library for Next.js that turns words into fully integrated
				components, like magic.
			</p>
			<p className="text-sm sm:text-base max-w-3xl mx-auto text-slate-600 dark:text-white">
				Responsible, customizable and open source.
			</p>
			<div className="mt-8 flex grow items-center gap-6">
				<Button as={Link} href={routes.getStarted}>
					Get started
				</Button>
				<Button
					as={Link}
					href={routes.examples}
					color="secondary"
					variant="outlined"
				>
					<IconPlay width={20} height={20} className="mr-2" />
					Try it live
				</Button>
			</div>
		</PageHeader>
	)
}

export default Hero
