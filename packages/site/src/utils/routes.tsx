import type { ReactNode } from 'react'
import type { CardProps } from '@/src/types/Card'
import { Chip } from '@/src/components/Chip'
import imagePrompt from '@/public/images/InfinityStrip.png'
import imageError from '@/public/images/Cone.png'
import imageNotFound from '@/public/images/Disc.png'
import imageHtmlPage from '@/public/images/MobiusStrip.png'
import imageBlock from '@/public/images/WireframeCube.png'
import imageImage from '@/public/images/Asterisk.png'
import imageSelect from '@/public/images/DiamondSlim.png'
import imageText from '@/public/images/Cube.png'
import imageChat from '@/public/images/Wedge.png'
import { IconBookSparkles } from '@/src/components/Icons/IconBookSparkles'
import { IconPile } from '@/src/components/Icons/IconPile'
import { IconShapes } from '@/src/components/Icons/IconShapes'
import { NAME_SHORT, URL_DISCUSSIONS, URL_GITHUB } from '@/src/utils/constants'

export const routes = {
	examples: '/examples',
	// Docs introduction
	docs: '/docs',
	getStarted: '/docs/get-started',
	usage: '/docs/usage',
	concepts: '/docs/concepts',
	// Docs features
	block: '/docs/block',
	htmlPage: '/docs/html-page-generator',
	audio: '/docs/audio',
	errors: '/docs/error-enhancer',
	image: '/docs/image',
	notFound: '/docs/not-found-enhancer',
	prompt: '/docs/prompt',
	select: '/docs/select',
	text: '/docs/text',
}

const { examples, ...restRoutes } = routes

export const routesDocs = restRoutes

export type RoutesWithMeta = Omit<CardProps, 'title'> & {
	title: string
	href: string
	isTitle?: boolean
	isFullWidth?: boolean
	hasDivider?: boolean
	icon?: ReactNode
}

const imageSize = {
	width: 300,
	height: 300,
	sizes: '(min-width: 1200px) 25vw, (min-width: 640px) 33.75vw, 17.52vw',
}

export const routesCardsMeta: RoutesWithMeta[] = [
	{
		title: 'Prompt',
		href: routes.prompt,
		children: 'Easily integrate AI prompts into any part of your application.',
		image: {
			src: imagePrompt,
			alt: 'Infinity',
			priority: true,
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
				<Chip>Utils</Chip>
			</>
		),
	},

	{
		title: 'Text',
		href: routes.text,
		children: 'AI transforms, creates or modifies text, markdown or HTML.',
		image: {
			src: imageText,
			alt: 'Cube',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
				<Chip>Utils</Chip>
			</>
		),
	},
	{
		title: 'Audio',
		href: routes.audio,
		children: 'Generate speech or transcribe audio with AI.',
		image: {
			src: imageChat,
			alt: 'Wedge',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Components</Chip>
				<Chip>Hooks</Chip>
				<Chip>Utils</Chip>
			</>
		),
	},
	{
		title: 'Image',
		href: routes.image,
		children: 'AI creates images with prompts or generates image descriptions.',
		image: {
			src: imageImage,
			alt: 'Asterisk',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
				<Chip>Utils</Chip>
			</>
		),
	},
	{
		title: 'Select',
		href: routes.select,
		children: 'AI creates, sorts and labels dropdowns or lists of content.',
		image: {
			src: imageSelect,
			alt: 'Diamond',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
				<Chip>Utils</Chip>
			</>
		),
	},
	{
		title: 'Block',
		href: routes.block,
		children: 'AI React Components. Prompt goes in, component comes out.',
		image: {
			src: imageBlock,
			alt: 'A wireframe cube',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
				<Chip>Utils</Chip>
			</>
		),
	},
	{
		title: 'HTML Page',
		href: routes.htmlPage,
		children: 'AI-Powered HTML page generation. Designs and codes full pages.',
		image: {
			src: imageHtmlPage,
			alt: 'MobiusStrip',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Hook</Chip>
				<Chip>Utils</Chip>
			</>
		),
	},
	{
		title: 'Not Found Enhancer',
		href: routes.notFound,
		children: (
			<>
				AI-Powered <i>Page Not Found</i>. Get help finding the page you were
				looking for.
			</>
		),
		image: {
			src: imageNotFound,
			alt: 'Disc',
			priority: true,
			...imageSize,
		},
		footer: (
			<>
				<Chip>Hook</Chip>
				<Chip>Utils</Chip>
			</>
		),
	},
	{
		title: 'Error Enhancer',
		href: routes.errors,
		children:
			'AI-Powered Error Enhancer. Debug and make sense of technical errors.',
		image: {
			src: imageError,
			alt: 'Cone',
			priority: true,
			...imageSize,
		},
		footer: (
			<>
				<Chip>Components</Chip>
				<Chip>Hook</Chip>
				<Chip>Utils</Chip>
			</>
		),
	},
]

export const routesDocsIntroMeta: RoutesWithMeta[] = [
	{
		title: 'Get started',
		href: routes.getStarted,
		isFullWidth: true,
		children: `Install and get started with ${NAME_SHORT}.`,
		variant: 'primary',
		icon: <IconBookSparkles />,
	},
	{
		title: 'Usage',
		href: routes.usage,
		children: 'Styling and a quickstart usage example to learn the basics.',
		icon: <IconShapes />,
	},
	{
		title: 'Concepts',
		href: routes.concepts,
		hasDivider: true,
		children: 'Core concepts, data fetching patterns and import paths.',
		icon: <IconPile />,
	},
]

export const routesDocsMeta: RoutesWithMeta[] = [
	...routesDocsIntroMeta,
	...routesCardsMeta,
]

export const routesMeta: RoutesWithMeta[] = [
	{
		title: 'Documentation',
		href: routes.docs,
		isTitle: true, // Only one item should have this
	},
	...routesDocsMeta,
]

export const routesFooterMeta: RoutesWithMeta[] = [
	{
		title: 'Try it live',
		href: routes.examples,
	},
	{
		title: 'Get started',
		href: routes.getStarted,
	},
	{
		title: 'Docs',
		href: routes.docs,
	},
	{
		title: 'Community',
		href: URL_DISCUSSIONS,
	},
	{
		title: 'GitHub',
		href: URL_GITHUB,
	},
]
