import { request } from '../utils/request'
import type { ReactNode, ElementType, HTMLAttributes } from 'react'
import type { AsComponent } from '../types/AsComponent'
import { ApiUrlEnum } from '../enums/ApiUrlEnum'

export interface PromptProps extends HTMLAttributes<HTMLElement> {
	prompt: string
	/** Children to render before the prompt response content */
	children?: ReactNode
}

export const defaultElement = 'div'

/**
 * Renders a prompt response as its children.
 *
 * The response can be wrapped in an element by using the `as` prop.
 * @exampe `as` usage
 * `<Prompt prompt="The longest river in the world" as="div" className="text-xl" />` => <div class="text-xl">The longest river in the world is the Nile River</div>
 */
export async function Prompt<C extends ElementType = typeof defaultElement>({
	as,
	prompt,
	children,
	...rest
}: AsComponent<C, PromptProps>) {
	const data = await request(ApiUrlEnum.prompt, { body: { prompt } })

	if (as) {
		const Component = as as 'div' | C
		return (
			<Component {...rest}>
				<>
					{children}
					{data}
				</>
			</Component>
		)
	}

	return (
		<>
			{children}
			{data}
		</>
	)
}

export default Prompt
