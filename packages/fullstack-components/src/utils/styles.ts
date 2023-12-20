import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes in JS without style conflicts.
 * uses `clsx` first to parse inputs as it's more robust at handling various inputs.
 *
 * @link https://www.npmjs.com/package/tailwind-merge `tailwind-merge` for full `twMerge` type information.
 * @link https://www.npmjs.com/package/clsx `clsx` for full `clsx` type information.
 */
export function merge(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
