![Fullstack Components - Build websites by writing prompts](https://github.com/trikinco/fullstack-components/raw/main/packages/site/public/images/repo-header-dark.png)

# [Fullstack Components](https://fullstack-components.vercel.app)

Fullstack Components is an AI-powered library for Next.js that turns words into fully integrated components.

## Installation

```sh
npm i @trinkinco/fullstack-components
```

The easiest way to get started is to follow the [get started section in our documentation](https://fullstack-components.vercel.app/docs/get-started).

See [fullstack-components.vercel.app](https://fullstack-components.vercel.app) for more information, documentation and examples.

## Quick Features

Get started with AI on the web quickly and leverage AI as a natural part of development – all while retaining full control of your code.

- **Get started with GPT prompts quickly:** Server Component and client React hooks for generic prompts
- **Generative UI:** Create dynamic React components and full HTML pages with a single prompt
- **Not Found Enhancement:** Uses AI to find the closest matching page to the `not found` URL and a helpful message for users
- **Error Enhancement:** Uses AI and smart error boundaries to show users an understandable message or show developers helpful debugging advice
- **Image Generation and Vision API:** Image Server Component enhances `next/image` to auto add alt tags, or generate images with DALL·E
- **AI Text Generation:** Create, modify and edit text with Server Components and dynamically with React hooks
- **AI Select Dropdown & Lists:** Generate, sort, select and label content in dropdowns or lists

See [fullstack-components.vercel.app](https://fullstack-components.vercel.app) for more information, documentation and examples of these features.

## Requirements

- `nextjs >=13`
- `react >=18`

### TypeScript

Fullstack Components comes with built-in types.

## Setup

### Step 1: Add the API handler route

Create a new [dynamic route](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) with an API handler route in your Next.js app. The file will handle all the API endpoints needed by `fullstack-components` to serve data to components, hooks and fetchers.

Depending on which router you use in Next.js, the location of the API handler route will differ:

- Using the Next.js **App Router**: `app/api/fsutils/[...fscomponents]/route.ts`
- Using the Next.js **Pages Router**: `pages/api/fsutils/[...fscomponents].ts`

### Step 2: Configure the API handler route

As an example, let's set up the API handler for the `Image` component by adding `image: handleImageRequest()`.

```ts title="app/api/fsutils/[...fscomponents]/route.ts"
import {
	handleFSComponents,
	handleImageRequest,
} from '@trikinco/fullstack-components'

const fscHandler = handleFSComponents({
	// Configure one or more handlers
	image: handleImageRequest({
		openAiApiKey: process.env.OPENAI_API_KEY || '',
	}),
	// ...Add more handlers here
})

export { fscHandler as GET, fscHandler as POST }
```

_All requests to `/api/fsutils/*`(image, prompt, notFoundEnhancer, etc.) will automatically be handled by `fullstack-components`, as long as you've added the appropriate handler._

**Note:** there's no auth on these endpoints but you can wrap them to add auth.

All handlers can be imported from `@trikinco/fullstack-components` and are prefixed with `handle`.

**Handlers examples:**

- image: handleImageRequest
- text: handleTextRequest
- select: handleSelectRequest
- block: handleBlockRequest
- htmlPage: handleHtmlPageRequest
- prompt: handlePromptRequest
- errorEnhancer: handleErrorRequest
- notFoundEnhancer: handleNotFoundEnhancement

## Usage example

### Enhanced Not Found Component

This component uses your sitemap to find the closest matching page to the "not found" URL. It also uses the contents of your website URLs to create a helpful message for users.

#### Step 1: Configure the API handler

In the API handler file, you should add the following configuration to use this component.

**Not Found Enhancer requires configuration of the API handler.**

**Note:** not all features require configuration, so read the documentation for each.

```ts
export const POST = handleFSComponents({
	notFoundEnhancer: handleNotFoundEnhancement({
		siteUrl: process.env.SITE_URL || '', // used to inspect the sitemap
		openAiApiKey: process.env.OPENAI_API_KEY || '', // used to generate the contents
	}),
})
```

#### Step 2: Create a new client component in your Next.js app

The key is to use the `useNotFoundEnhancement` hook to get the data from the API endpoint.

```tsx title="components/NotFoundEnhancer.tsx"
'use client'

import { useNotFoundEnhancement } from '@trikinco/fullstack-components/client'
import Link from 'next/link'

export function NotFoundEnhancer() {
	const { data, isLoading } = useNotFoundEnhancement()
	const hasUrlSuggestions =
		data?.bestAlternateUrls && data.bestAlternateUrls.length > 0

	if (!data || isLoading) {
		return <p>Please wait, checking for other solutions...</p>
	}

	return (
		<div className="mt-6">
			<p>{data?.generatedContent}</p>
			{hasUrlSuggestions && (
				<>
					<p className="font-bold">Try one of these pages instead:</p>
					{data?.bestAlternateUrls.map((url, i) => (
						<Link href={url} key={i} className="block">
							{url}
						</Link>
					))}
				</>
			)}
			{!hasUrlSuggestions && (
				<p>Sorry we couldn't find additional pages for you to try this time.</p>
			)}
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
