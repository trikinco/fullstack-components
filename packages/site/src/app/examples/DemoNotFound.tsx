'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { useNotFoundEnhancement } from '../../../../fullstack-components/dist/client'
import { Button } from '@/src/components/Elements/Button'
import { Spinner } from '@/src/components/Spinner'

function NotFound({ pathname }: { pathname: string }) {
	const id = useId()
	const requestedUrl = `${window.location.origin}${pathname}`
	const { data, isLoading } = useNotFoundEnhancement({ requestedUrl })
	const hasUrlSuggestions =
		data?.bestAlternateUrls && data.bestAlternateUrls.length > 0

	return (
		<div className="flex flex-col gap-3">
			<p className="text-lg font-bold block text-center">
				{`404 Couldn't Find "${pathname}" 😔`}
			</p>
			{(!data || isLoading) && (
				<Spinner className="mx-auto" classNameSpinner="mx-auto">
					Please wait, looking for other pages...
				</Spinner>
			)}

			<p className="my-0">{data?.generatedContent}</p>

			{hasUrlSuggestions && (
				<div>
					<p className="font-bold mb-2" id={id}>
						Try one of these pages instead
					</p>
					<ul aria-labelledby={id}>
						{data?.bestAlternateUrls.map((url, i) => (
							<li key={i}>
								<Link href={url} className="block underline text-black">
									{url}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
			{!isLoading && !hasUrlSuggestions && (
				<p>
					{`Sorry we couldn't find additional pages for you to try this time.`}
				</p>
			)}
		</div>
	)
}

export default function Page() {
	const [pathname, setPathname] = useState('')

	if (!pathname) {
		return (
			<div className="flex flex-col gap-6">
				<div className="text-lg text-black block text-center">Visit a page</div>
				<div className="flex gap-3">
					<Button
						type="button"
						color="secondary"
						className="font-medium text-white bg-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 text-sm md:text-base h-10 px-4 md:h-12 md:px-6"
						onClick={() => setPathname('/setup')}
					>
						Setup
					</Button>
					<Button
						type="button"
						color="secondary"
						className="font-medium text-white bg-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 text-sm md:text-base h-10 px-4 md:h-12 md:px-6"
						onClick={() => setPathname('/images')}
					>
						Images
					</Button>
					<Button
						type="button"
						color="secondary"
						className="font-medium text-white bg-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 text-sm md:text-base h-10 px-4 md:h-12 md:px-6"
						onClick={() => setPathname('/enhancer')}
					>
						Enhancer
					</Button>
				</div>
			</div>
		)
	}

	return <NotFound pathname={pathname} />
}
