'use client'

import { useId } from 'react'
import { useChat as useAiChat, type UseChatOptions } from 'ai/react'
import { useAutoSize } from '@/src/hooks/useAutoSize'

type UseAIChatProps = Omit<UseChatOptions, 'api'> & {
	api?: string
}

export interface UseChatProps extends UseAIChatProps {
	minRows?: number
	maxRows?: number
}

export const useChat = ({
	maxRows = 10,
	minRows = 1,
	...rest
}: UseChatProps) => {
	const id = useId()
	const { input, ...aiChat } = useAiChat(rest)
	const autoSize = useAutoSize({ input, minRows, maxRows })

	return {
		id,
		input,
		...autoSize,
		...aiChat,
	}
}
