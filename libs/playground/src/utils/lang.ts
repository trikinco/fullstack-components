const ordinalRules = new Intl.PluralRules('en', { type: 'ordinal' })
const suffixes: Record<Intl.LDMLPluralRule, string> = {
	zero: 'th',
	one: 'st',
	two: 'nd',
	few: 'rd',
	many: 'th',
	other: 'th',
}

/**
 * Gets numbers with ordinals
 * @example 5th
 */
export function ordinal(number: number) {
	const category = ordinalRules.select(number)
	const suffix = suffixes[category]

	return number + suffix
}
