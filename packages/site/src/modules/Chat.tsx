'use client'
import { merge } from '@trikinco/fullstack-components/utils'
import { useChat, UseChatProps } from '@/src/hooks/useChat'

export type ChatProps = UseChatProps

export function Chat({ maxRows = 10, minRows = 1, ...rest }: ChatProps) {
	const {
		id,
		formRef,
		textareaRef,
		textareaShadowRef,
		messages,
		input,
		commentEnterSubmit,
		handleInputChange,
		handleSubmit,
	} = useChat({ minRows, maxRows, ...rest })

	return (
		<div className="stretch mx-auto flex w-full max-w-md min-h-screen flex-col py-16 lg:py-24">
			{messages?.length > 0 ? (
				messages.map(({ id, role, content }) => (
					<div
						className={`p-3 lg:p-5 ${
							role === 'user'
								? 'bg-slate-200 dark:bg-slate-800'
								: 'bg-slate-300 dark:bg-slate-900'
						}`}
						key={`${id}-${role}`}
						data-ai-role={role}
					>
						<span className="mr-3">{role === 'user' ? '🤠' : '🤖'}</span>
						<span>{content}</span>
					</div>
				))
			) : (
				<div>Say something to start a chat...</div>
			)}

			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className="sticky bottom-6 mt-auto left-0 right-0 mx-auto mb-8 w-full max-w-md p-2"
			>
				<div className="overflow-hidden focus-within:shadow-lg focus-within:border-blue-300 flex flex-col w-full dark:border-gray-900/50 flex-grow border-2 border-black/10 dark:text-white rounded-xl dark:bg-gray-700 bg-white">
					<div className="relative">
						<label htmlFor={id} className="sr-only">
							Say something...
						</label>
						<textarea
							ref={textareaRef}
							id={id}
							rows={minRows}
							className={merge(
								'flex focus:outline-none w-full m-0 resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent',
								'py-4 pr-14 md:pr-20 pl-3 md:pl-4'
							)}
							value={input}
							onChange={handleInputChange}
							onKeyUp={commentEnterSubmit}
						/>
						<textarea
							ref={textareaShadowRef}
							value="x"
							className="invisible absolute overflow-hidden p-0 h-0 top-0 left-0 [transform:translateZ(0px)]"
							aria-hidden
							readOnly
							tabIndex={-1}
						/>
						<button
							className="absolute right-2 bottom-2 text-white bg-black border p-2 rounded-md"
							type="submit"
						>
							Send
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
