import { FileLikeBlob } from './FileLikeBlob'
import fs from 'fs'
import path from 'path'

/**
 * Gets a file from the local filesystem public dir or from a buffer to send to OpenAI in the format that OpenAI API expects.
 */
export function getApiFile(
	file: ArrayBuffer | string | undefined,
	/**
	 * mime type
	 */
	type: string,
	/**
	 * Full file name including file extension.
	 */
	name?: string
) {
	if (!file) return

	if (file instanceof ArrayBuffer && typeof file !== 'string') {
		return new FileLikeBlob([file], {
			type,
			name: name || type.split('/').join('.'),
		})
	}

	return fs.createReadStream(path.join(process.cwd(), 'public', file))
}
