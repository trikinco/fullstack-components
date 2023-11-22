import type { ReactElement, ReactNode } from 'react'

/**
 * Renders a react tree to a static HTML string.
 * @see {@link https://github.com/vercel/next.js/issues/43810}
 * @note server version of `client/renderToString`
 */
export const renderToStaticMarkup = async (
	component: ReactElement | ReactNode
) => {
	const { default: ReactDOMServer } = await import('react-dom/server')

	return ReactDOMServer.renderToStaticMarkup(component as ReactElement)
}
