export type Enumerate<
	N extends number,
	Accumulator extends number[] = [],
> = Accumulator['length'] extends N
	? Accumulator[number]
	: Enumerate<N, [...Accumulator, Accumulator['length']]>

export type Range<F extends number, T extends number> =
	| Exclude<Enumerate<T>, Enumerate<F>>
	| T
