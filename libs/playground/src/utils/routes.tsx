import type { CardProps } from '@/src/types/Card'
import { Chip } from '@/src/components/Chip'

export const routes = {
	docs: '/docs',
	block: '/docs/block',
	htmlPage: '/docs/html-page',
	getStarted: '/docs/get-started',
	chat: '/docs/chat',
	errors: '/docs/errors',
	image: '/docs/image',
	notFound: '/docs/not-found',
	prompt: '/docs/prompt',
	select: '/docs/select',
	text: '/docs/text',
}

type RoutesWithMeta = Omit<CardProps, 'title'> & {
	title: string
	href: string
	isTitle?: boolean
}

const imageSize = {
	width: 1000,
	height: 1000,
}

export const routesCardsMeta: RoutesWithMeta[] = [
	{
		title: 'Prompt',
		href: routes.prompt,
		children: 'Easily integrate AI prompts into any part of your application.',
		image: {
			src: '/images/InfinityStrip.png',
			alt: 'Infinity',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
			</>
		),
	},
	{
		title: 'Error Enhancer',
		href: routes.errors,
		children:
			'AI-Powered Error Enhancer. Debug and make sense of technical errors.',
		image: {
			src: '/images/Cone.png',
			alt: 'Cone',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
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
			src: '/images/Disc.png',
			alt: 'Disc',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Hook</Chip>
			</>
		),
	},
	{
		title: 'HTML Page',
		href: routes.htmlPage,
		children: 'AI-Powered HTML page generation. Designs and codes full pages.',
		image: {
			src: '/images/MobiusStrip.png',
			alt: 'MobiusStrip',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Hook</Chip>
			</>
		),
	},
	{
		title: 'Block',
		href: routes.block,
		children: 'AI React Components. Prompt goes in, component comes out.',
		image: {
			src: '/images/WireframeCube.png',
			alt: 'A wireframe cube',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
			</>
		),
	},
	{
		title: 'Image',
		href: routes.image,
		children: 'AI creates images with prompts or generates image descriptions.',
		image: {
			src: '/images/Asterisk.png',
			alt: 'Asterisk',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
			</>
		),
	},
	{
		title: 'Select',
		href: routes.select,
		children: 'AI creates, sorts and labels dropdowns or lists of content.',
		image: {
			src: '/images/DiamondSlim.png',
			alt: 'Diamond',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
			</>
		),
	},
	{
		title: 'Text',
		href: routes.text,
		children: 'AI transforms, creates or modifies text, markdown or HTML.',
		image: {
			src: '/images/Cube.png',
			alt: 'Cube',
			...imageSize,
		},
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
			</>
		),
	},
	{
		title: 'Chat',
		href: routes.chat,
		children:
			'Everything you need to create fully integrated, custom chat experiences.',
		image: {
			src: '/images/Wedge.png',
			alt: 'Wedge',
			...imageSize,
		},
		header: (
			<Chip className="bg-orange-100 border-orange-200 dark:bg-orange-950 dark:border-orange-900">
				Demo
			</Chip>
		),
		footer: (
			<>
				<Chip>Component</Chip>
				<Chip>Hook</Chip>
			</>
		),
	},
]

export const routesDocsMeta: RoutesWithMeta[] = [
	{
		title: 'Get started',
		href: routes.getStarted,
	},
	...routesCardsMeta
]

export const routesMeta: RoutesWithMeta[] = [
	{
		title: 'Documentation',
		href: routes.docs,
		isTitle: true, // Only one item should have this
	},
	...routesDocsMeta,
]
