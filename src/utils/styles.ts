import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * merge Tailwind CSS classes in JS without style conflicts.
 * uses `clsx` first to parse inputs as it's more robust at handling various inputs.
 *
 * @see https://www.npmjs.com/package/tailwind-merge
 * @see https://www.npmjs.com/package/clsx
 */
export function merge(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
