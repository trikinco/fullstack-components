Smart web components with built in AI

## Requirements

`nextjs >=13`
`react >=18`

## Installation

`npm i @name/name`
`pnpm i @name/name`
`yarn add @name/name`

## Usage

Create a new handler for all the api endpoints in your nextjs app. These api routes are used to serve the components and their data on the frontend.

The location of the file should be:

`app/api/fsutils/[fscomponents]/route.ts`

or if using pages
`pages/api/fsutils/[fscomponents].ts`

And the contents should be:

```ts
import { handleFSComponents } from '@fullstack-components/ai-components'

export const GET = handleFSComponents()
export const POST = handleFSComponents()
```

Note there's no auth on these endpoints but you can wrap them to add auth. [[TODO]] Add notes about this.

## Components

There are many components available. Here are some examples.

### Enhanced Not Found Component

This components uses your site map to find the closest matching page to the not found url. It also uses the contents of your website urls to create a helpful message for your customer.

Step 1: Create a new client component in your nextjs app

The key here is to use the `useNotFoundEnhancement` hook to get the data from the api endpoint.

```tsx
// components/NotFoundEnhancment.tsx
'use client'

import { useNotFoundEnhancement } from '@fullstack-components/ai-components/client'
import Link from 'next/link'

export function NotFoundEnhancer() {
	const { content, isLoading } = useNotFoundEnhancement()
	if (!content || isLoading) {
		return <p>Checking for alternate solution...</p>
	}
	return (
		<div>
			<p>{content?.generatedContent}</p>
			<p>Try this url instead:</p>
			<div>
				<Link href={content?.bestAlternateUrl || '#'}>
					{content?.bestAlternateUrl || 'No alternate url found'}
				</Link>
			</div>
		</div>
	)
}
```

Then create the not-found page in your nextjs app. If you're using pages there is a different page - 404.tsx. See the nextjs docs for how this works. There are some tricky things for dynamic routes because they render after static routes.

```tsx
// pages/404.tsx or app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
	return (
		<div>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href="/">Return Home</Link>
			<NotFoundEnhancer />
		</div>
	)
}
```
