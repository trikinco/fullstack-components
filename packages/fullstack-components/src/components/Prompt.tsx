import type { ReactNode, ElementType, HTMLAttributes } from 'react'
import type { AsComponent } from '../types/AsComponent'
import type { ChatMessage } from '../types/ChatMessage'
import { getPrompt } from '../handlers/prompt/promptClient'

export interface PromptOnlyProps {
	/** A text description of the desired output. */
	prompt: string
	/** Children to render before the response content. */
	children?: ReactNode
}

export interface PromptWithMessagesProps {
	/**
	 * A list of chat completion messages comprising a conversation.
	 * @see `openai` for full `OpenAI.ChatCompletionMessageParam` type information.
	 */
	messages: ChatMessage[]
	/** Children to render before the response content. */
	children?: ReactNode
}

/**
 * Props to pass to the `<Prompt>`.
 * @extends `PromptOnlyProps | PromptWithMessagesProps`
 * @extends `HTMLAttributes<HTMLElement>`.
 */
export type PromptProps = HTMLAttributes<HTMLElement> &
	(PromptOnlyProps | PromptWithMessagesProps)

const defaultElement = 'div'

/**
 * Prompt Server Component
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
