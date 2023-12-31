import type { ReactElement, ReactNode } from 'react'

/**
 * Renders a React tree to a static HTML string.
 * @link https://github.com/vercel/next.js/issues/43810
 * @note server version of `client/renderToString`
 */
export const renderToStaticMarkup = async (
	component: ReactElement | ReactNode
) => {
	// eslint-disable-next-line unicorn/no-await-expression-member
	const ReactDOMServer = (await import('react-dom/server')).default

	return ReactDOMServer.renderToStaticMarkup(component as ReactElement)
}
