import { useEffect, useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode, { Theme, Options } from 'rehype-pretty-code'
import theme from '@/src/assets/themes/css-variables.json' assert { type: 'json' }

export async function highlightCode(code: string, options?: Options) {
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(
			rehypePrettyCode,
			/**
			 * Use the 'css-variables' theme to enable easy custom styling for light and dark mode
			 * @note styles are defined in `src/styles/globals.css`
			 * @see {@link https://github.com/shikijs/shiki/blob/main/docs/themes.md#theming-with-css-variables theming with CSS variables}
			 */
			{
				theme: theme as unknown as Theme,
				keepBackground: false,
				...options,
			}
		)
		.use(rehypeStringify)
		.process(code)

	return file.toString()
}

export function useCodeHighlighter(code?: string, options?: Options) {
	const [isLoading, setIsLoading] = useState(false)
	const [highlightedCode, setHighlightedCode] = useState('')

	useEffect(() => {
		if (!code || isLoading) return

		async function handleCode(code: string) {
			try {
				setIsLoading(true)
				const result = await highlightCode(code, options)
				setHighlightedCode(result)
			} catch (error) {
				console.error('Error while highlighting code: ', error)
			} finally {
				setIsLoading(false)
			}
		}

		handleCode(code)
	}, [code, options, isLoading])

	return {
		isLoading,
		data: highlightedCode,
	}
}
