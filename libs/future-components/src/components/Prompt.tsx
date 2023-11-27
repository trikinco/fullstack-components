import type { ReactNode, ElementType, HTMLAttributes } from 'react'
import type { AsComponent } from '../types/AsComponent'
import type { ChatMessage } from '../types/ChatMessage'
import { getPrompt } from '../handlers/prompt/getters'

export type PromptProps = HTMLAttributes<HTMLElement> & {
	/** Children to render before the prompt response content */
	children?: ReactNode
} & (
		| { prompt: string; messages?: ChatMessage[] }
		| { prompt?: string; messages: ChatMessage[] }
	)

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
	messages,
	children,
	...rest
}: AsComponent<C, PromptProps>) {
	const response = await getPrompt({ prompt, messages })

	if (as) {
		const Component = as as 'div' | C
		return (
			<Component {...rest}>
				<>
					{children}
					{response}
				</>
			</Component>
		)
	}

	return (
		<>
			{children}
			{response}
		</>
	)
}

export default Prompt
