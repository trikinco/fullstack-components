import defaultColors from 'tailwindcss/colors'
import { DefaultColors } from 'tailwindcss/types/generated/colors'

export type DeprecatedColors = (typeof deprecatedColorNames)[number]
export type ExcludedColors =
	| 'inherit'
	| 'current'
	| 'transparent'
	| 'black'
	| 'white'
export type ColorName = keyof Omit<
	DefaultColors,
	DeprecatedColors | ExcludedColors
>
export type Shades =
	| '50'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'
	| '950'
export type ShadesExtended = Shades & `${number}`
export type Color = `${ColorName}-${Shades}`

/**
 * Deprecated Tailwind colors
 */
export const deprecatedColorNames = [
	'lightBlue',
	'warmGray',
	'trueGray',
	'coolGray',
	'blueGray',
] as const

/**
 * Tailwind colors
 * - except deprecated
 * - except non-range values, e.g inherit, current, transparent, black, white
 */
export const colors = Object.entries(defaultColors)
	.filter(
		([key, value]) =>
			typeof value !== 'string' &&
			!deprecatedColorNames.includes(key as DeprecatedColors)
	)
	.map(
		([name, values]) =>
			({
				name,
				values,
			}) as {
				name: ColorName
				values: Shades[]
			}
	)

/**
 * All unique Tailwind `shade` values available across all colors
 * @example ['50', '100', '200', ...]
 */
export const valuesOnly = Array.from(
	new Set(
		Object.values(colors)
			.map(({ values }) => Object.keys(values))
			.flat()
	)
) as ShadesExtended[]

/**
 * All Tailwind `color` names except deprecated
 * @example ['slate', 'gray', ...]
 */
export const colorsOnly = Object.values(colors).map(({ name }) => name)

/**
 * Tailwind colors
 * - same exceptions as `colors`
 * - `values` only contain the shade numeric values `50-950` (hex has been omitted)
 */
export const colorsAndValuesOnly = Object.values(colors).map(
	({ name, values }) => ({
		name,
		values: Object.keys(values) as ShadesExtended[],
	})
)
