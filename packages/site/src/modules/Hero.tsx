'use client'

import { TypeAnimation } from 'react-type-animation'
import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import { PageHeader, type PageHeaderProps } from '@/src/components/PageHeader'
import { NAME_SHORT } from '@/src/utils/constants'
import { Button } from '@/src/components/Elements/Button'
import { IconPlay } from '@/src/components/Icons/IconPlay'
import { routes } from '@/src/utils/routes'

export type HeroProps = PageHeaderProps

export function Hero({ className }: HeroProps) {
	return (
		<PageHeader
			className={className}
			headingProps={{
				className: merge('text-4xl sm:text-5xl xl:text-6xl mt-6 xl:mt-0 mb-0'),
			}}
			title={
				<>
					<span className="sr-only">
						Build your next idea by writing prompts.
					</span>
					<TypeAnimation
						aria-hidden="true"
						className="block break-all whitespace-pre-line h-[86px] sm:h-[109px] xl:h-[137px]"
						preRenderFirstString
						speed={30}
						deletionSpeed={50}
						sequence={[
							'Build your next idea \nby writing prompts.',
							700,
							'Build your product \nby using AI.',
							1600,
							'Build your website \nby using <Prompt />',
							1250,
							'Build your blog \nwith <Audio />',
							1400,
							'Build your app \nby using <Text />',
							1300,
							'Build your platform \nwith <Image />',
							1600,
							'Build your next idea \nby using AI.',
						]}
					/>
				</>
			}
		>
			<p className="mt-6 text-lg sm:text-xl lg:text-2xl max-w-3xl text-slate-600 dark:text-white text-balance">
				<strong className="font-bold text-black dark:text-primary">
					{NAME_SHORT}
				</strong>{' '}
				is an AI-powered library for Next.js that helps you build your great
				ideas from end-to-end.
			</p>
			<p className="text-sm sm:text-base max-w-3xl mt-6 mb-0 text-slate-600 dark:text-white">
				Responsible, customizable and open source.
			</p>
			<div className="mt-10 sm:mt-12 flex grow items-center gap-6">
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
