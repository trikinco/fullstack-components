import type { ReactNode, ElementType, HTMLAttributes } from 'react'
import type { AsComponent } from '../types/AsComponent'
import type { ChatMessage } from '../types/ChatMessage'
import { getPrompt } from '../handlers/prompt/promptClient'

/**
 * Props to pass to the `<Prompt>` Server Component.
 * @extends HTMLAttributes<HTMLElement>
 */
export interface PromptProps extends HTMLAttributes<HTMLElement> {
	/**
	 * A text description of the desired output.
	 * @example 'The longest river in the world'
	 */
	prompt?: string
	/**
	 * A list of chat completion messages comprising a conversation.
	 * @link https://www.npmjs.com/package/openai `openai` for full `OpenAI.ChatCompletionMessageParam` type information.
	 */
	messages?: ChatMessage[]
	/**
	 * Children to render before the response content.
	 */
	children?: ReactNode
}

const defaultElement = 'div'

/**
 * Prompt Server Component.
 * Renders a prompt response as its children.
 * The response can be wrapped in an element by using the `as` prop.
 */
export async function Prompt<C extends ElementType = typeof defaultElement>(
	/**
	 * @link PromptProps
	 * @example `as` usage `<Prompt prompt="The longest river in the world" as="div" className="text-xl" />`
	 */
	props: AsComponent<C, PromptProps>
) {
	const { as, prompt, messages, children, ...rest } = props || {}
	const response = await getPrompt({ prompt, messages })
	const data = response.responseText

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
