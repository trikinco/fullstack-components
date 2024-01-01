export interface BlockRequestBody {
	/**
	 * A text description of the desired component.
	 * @example 'A footer with copyright for this year with the company name Acme'
	 */
	prompt?: string
}

export interface BlockResult {
	/**
	 * Stringified React components and declarations needed for data to be implemented by `usage`.
	 *
	 * @note that this is just a raw string containing React components. It will need to be sanitized and parsed before usage.
	 * @example `export const Wrapper = ({children,id}) =>
	 * 	<div id={id} className='p-5'>{children}</div>
	 *
	 * export const List = ({data}) =>
	 * 	<ul>
	 * 	{data?.map(item => (<li key={item.id} className='text-sm'>{item.text}</li>))}
	 * </ul>
	 * `
	 */
	content?: string
	/**
	 * Stringified React components with default props implementation of `content`.
	 *
	 * @note that this is just a raw string containing React components. It will need to be sanitized and parsed before usage.
	 * @example `<Wrapper id="main">
	 * 	<List data={[{id:1,text:'Hello'},{id:2,text:'World'}]}/>
	 * </Wrapper>
	 * `
	 */
	usage?: string
}

export type BlockOptions = {
	/**
	 * @default `process.env.OPENAI_API_KEY`.
	 */
	openAiApiKey?: string
}

export class BlockError extends Error {
	public rootCause: string

	constructor(error: any) {
		super('Error running block')
		this.name = 'BlockError'
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.rootCause = error.message
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		this.stack = error.stack
	}
}
