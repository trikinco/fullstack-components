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

type RoutesWithMeta = {
	title: string
	href: string
	isTitle?: boolean
}

export const routesDocsMeta: RoutesWithMeta[] = [
	{
		title: 'Get started',
		href: routes.getStarted,
	},
	{
		title: 'Prompt',
		href: routes.prompt,
	},
	{
		title: 'Error Enhancer',
		href: routes.errors,
	},
	{
		title: 'Not Found Enhancer',
		href: routes.notFound,
	},
	{
		title: 'HTML Page',
		href: routes.htmlPage,
	},
	{
		title: 'Block',
		href: routes.block,
	},
	{
		title: 'Image',
		href: routes.image,
	},
	{
		title: 'Select',
		href: routes.select,
	},
	{
		title: 'Text',
		href: routes.text,
	},
	{
		title: 'Chat',
		href: routes.chat,
	},
]

export const routesMeta: RoutesWithMeta[] = [
	{
		title: 'Documentation',
		href: routes.docs,
		isTitle: true, // Only one item should have this
	},
	...routesDocsMeta,
]
