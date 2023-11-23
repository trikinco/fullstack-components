export class BlockRequestBody {
	prompt?: string
}

export type BlockResponse = string

export type BlockOptions = {
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
