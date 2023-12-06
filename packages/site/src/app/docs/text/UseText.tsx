'use client'

import { useText } from '../../../../../fullstack-components/dist/client'

export default function Page() {
	const { isLoading, data } = useText({
		prompt: 'Simplify and shorten this text, only return plain text',
		grade: 5,
		max: 250,
		content: `
        One consequence of the basic quantum formalism is the uncertainty principle.
        In its most familiar form, this states that no preparation of a quantum
        particle can imply simultaneously precise predictions both for a measurement
        of its position and for a measurement of its momentum.
        
        Both position and momentum are observables, meaning that they are represented
        by Hermitian operators. The position operator X and momentum operator P do not
        commute, but rather satisfy the canonical commutation relation.
        `,
	})

	if (isLoading) {
		return 'Loading text...'
	}

	// The content can also be rendered with next-mdx-remote or similar
	return (
		<div className="mt-6 whitespace-pre-wrap">
			<h2>Rewritten text</h2>
			{data?.content}
		</div>
	)
}
