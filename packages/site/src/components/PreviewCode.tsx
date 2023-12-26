import { useId, type ReactNode } from 'react'
import { Tabs } from './Tabs'
import {
	ErrorBoundary,
	type ErrorBoundaryPropsWithFallback,
} from 'react-error-boundary'
import { IconEye } from './Icons/IconEye'
import { IconCode } from './Icons/IconCode'
import { CodeBlock } from './CodeBlock'

export interface PreviewCodeProps extends ErrorBoundaryPropsWithFallback {
	children?: ReactNode
	/** the code to preview and show */
	code?: string | null
	/** accessible label for the preview iframe */
	title: string
}

export const PreviewCode = ({
	title,
	code,
	fallback,
	children,
}: PreviewCodeProps) => {
	const id = useId()

	return (
		<div className="relative">
			<Tabs
				hideTabs={!code}
				tabs={[
					{
						id: `${id}-preview`,
						label: 'Preview',
						icon: <IconEye width={20} height={20} />,
						children: (
							<div className="aspect-square md:aspect-video overflow-hidden bg-white rounded-lg shadow-lg">
								<ErrorBoundary fallback={fallback}>
									<iframe
										id={id}
										title={title}
										/**
										 * This is just a POC.
										 * To truly be sandboxed, the iframe should likely
										 * consume an `src` doc from another domain, otherwise
										 * `allow-same-origin` and `allow-scripts` may still
										 * allow for breaking out of the sandbox
										 */
										sandbox="allow-same-origin allow-scripts allow-modals allow-popups allow-presentation allow-downloads allow-pointer-lock"
										className="w-full h-full border-0 min-h-0 overflow-auto opacity-100 z-10 select-auto pointer-events-auto"
										srcDoc={code || ''}
									/>
								</ErrorBoundary>
							</div>
						),
					},
					{
						id: `${id}-code`,
						label: 'Code',
						icon: <IconCode width={20} height={20} />,
						disabled: !code,
						children: (
							<div className="aspect-square md:aspect-video rounded-lg shadow-lg overflow-auto bg-[--shiki-color-background] border border-slate-300 dark:border-white/20">
								<CodeBlock noCopy raw={code || ''}>
									{code}
								</CodeBlock>
							</div>
						),
					},
				]}
			>
				{children}
			</Tabs>
		</div>
	)
}

export default PreviewCode
