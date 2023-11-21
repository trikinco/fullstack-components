# [Fullstack Components](https://fullstack-components.vercel.app)

Fullstack Components is an AI-powered library for Next.js that turns words into fully integrated components.

## Installation

```sh
npm i @trinkinco/fullstack-components
```

The easiest way to get started is to follow the [get started section in our documentation](https://fullstack-components.vercel.app/docs/get-started).

See [fullstack-components.vercel.app](https://fullstack-components.vercel.app) for more information, documentation and examples.

## Requirements

- `nextjs >=13`
- `react >=18`

## Features

Get started with AI on the web quickly and leverage AI as a natural part of development – all while retaining full control of your code.

### Components and hooks

- Prompt
- usePrompt
- Block
- Select
- useSelect
- Image
- useErrorEnhancement
- useNotFoundEnhancement

See [fullstack-components.vercel.app](https://fullstack-components.vercel.app) for more information, documentation and examples of these features.

### TypeScript

Fullstack Components comes with built-in types.

## Usage

Create a new handler for all the API endpoints in your Next.js app. These API routes are used to serve the components and their data on the frontend.

Depending on which router you use in Next.js, the location of the API handler will differ:

- Using the Next.js App Router: `app/api/fsutils/[fscomponents]/route.ts`
- Using the Next.js Pages Router: `pages/api/fsutils/[fscomponents].ts`

And the contents should be:

```ts
import { handleFSComponents } from '@trikin-co/fullstack-components'

const fscHandler =
	handleFSComponents(/* various options. see each component below */)

export { fscHandler as GET, fscHandler as POST }
```

Note there's no auth on these endpoints but you can wrap them to add auth.

### Enhanced Not Found Component

This component uses your sitemap to find the closest matching page to the "not found" URL. It also uses the contents of your website URLs to create a helpful message for users.

#### Step 1: Configure the handler

In the API handler file, you should add the following configuration to use this component.
Not Found Enhancer DOES require configuration.
Note that not all of them require configuration, read the documentation for each.

```ts
const fscHandler = handleFSComponents({
	notFoundEnhancer: handleNotFoundEnhancement({
		siteUrl: process.env.SITE_URL || '', // used to inspect the sitemap
		openAiApiKey: process.env.OPENAI_API_KEY || '', // used to generate the contents
	}),
})

export { fscHandler as GET, fscHandler as POST }
```

#### Step 2: Create a new client component in your Next.js app

The key here is to use the `useNotFoundEnhancement` hook to get the data from the API endpoint.

```tsx
// components/NotFoundEnhancment.tsx
'use client'

import { useNotFoundEnhancement } from '@trikinco/fullstack-components/client'
import Link from 'next/link'

export function NotFoundEnhancer() {
	const { content, isLoading } = useNotFoundEnhancement()
	if (!content || isLoading) {
		return <p>Please wait, checking for other solutions...</p>
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

#### Step 3: Create a `not-found` page

- Using the Next.js App Router: Create a [`not-found.tsx` page](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) in your app.
- Using the Next.js Pages Router: [Create a `404.tsx` page](https://nextjs.org/docs/pages/building-your-application/routing/custom-error#404-page) in your app.

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

## Feedback And Discussions

The Fullstack Components community can be found on [GitHub Discussions](https://github.com/trikinco/fullstack-components/discussions), where you can provide feedback, ask questions, voice ideas, and share your projects.

## Authors

- Lars Magnus Klavenes ([@larsmagnus](https://github.com/larsmagnus))
- Darragh O'Riordan ([@darraghoriordan](https://github.com/darraghoriordan))
- Connor Thomsen ([@cononic](https://github.com/CONONIC))
