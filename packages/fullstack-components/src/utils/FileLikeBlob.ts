/**
 * Enables making direct follow-up calls with file-like objects
 * received from the OpenAI API, without needing to store the file to disk first.
 */
export class FileLikeBlob extends Blob {
	/**
	 * The last modified date of the file.
	 * @note a last modified date is required for openai to accept the file
	 */
	lastModified: number
	/**
	 * Full file name including file extension.
	 * @note a full file name including file extension is required for openai to accept the file
	 */
	name: string

	constructor(
		blobParts?: BlobPart[] | undefined,
		options?:
			| (BlobPropertyBag & { lastModified?: number; name?: string })
			| undefined
	) {
		super(blobParts, options)
		this.lastModified = options?.lastModified || Date.now()
		this.name = options?.name || ''
	}
}
