export const routes = {
	docs: '/docs',
	block: '/docs/block',
	ui: '/docs/ui',
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
		title: 'Block',
		href: routes.block,
	},
	{
		title: 'Not found',
		href: routes.notFound,
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
		title: 'Generate UI',
		href: routes.ui,
	},
	{
		title: 'Error',
		href: routes.errors,
	},
	{
		title: 'Chat',
		href: routes.chat,
	},
	{
		title: 'Text',
		href: routes.text,
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
