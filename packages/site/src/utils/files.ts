import fs from 'fs'
import { join } from 'path'

/**
 * Gets all files in a directory
 */
export function findInDir(
	dir: string,
	filter: RegExp,
	fileList: string[] = []
) {
	const files = fs.readdirSync(dir)

	files.forEach((file) => {
		const filePath = join(dir, file)
		const fileStat = fs.lstatSync(filePath)

		if (fileStat.isDirectory()) {
			findInDir(filePath, filter, fileList)
		} else if (filter.test(filePath)) {
			fileList.push(filePath)
		}
	})

	return fileList
}
