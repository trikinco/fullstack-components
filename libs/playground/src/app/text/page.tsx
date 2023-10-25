import { TextSlide } from '@/src/components/TextSlide'

export default function Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-3xl mb-6">
				<code>TextRewrite</code> demo
			</h1>

			<div className="bg-white/10 mb-4 block p-4 rounded-md border-2 border-white/50">
				<code className="mb-3 block">Original text</code>
				<div className="prose dark:prose-invert">
					<h3>Quantum formalism and the uncertainty principle</h3>
					<p>
						One consequence of the basic quantum formalism is the uncertainty
						principle. In its most familiar form, this states that no
						preparation of a quantum particle can imply simultaneously precise
						predictions both for a measurement of its position and for a
						measurement of its momentum.
					</p>
					<p>
						Both position and momentum are observables, meaning that they are
						represented by Hermitian operators. The position operator X and
						momentum operator P do not commute, but rather satisfy the canonical
						commutation relation.
					</p>
				</div>
			</div>

			<div className="max-w-prose md:min-w-[65ch]">
				<TextSlide
					count={3}
					grade="5th-grade"
					max={150}
					className="prose dark:prose-invert"
				>
					<h3>Quantum formalism and the uncertainty principle</h3>
					<p>
						One consequence of the basic quantum formalism is the uncertainty
						principle. In its most familiar form, this states that no
						preparation of a quantum particle can imply simultaneously precise
						predictions both for a measurement of its position and for a
						measurement of its momentum.
					</p>
					<p>
						Both position and momentum are observables, meaning that they are
						represented by Hermitian operators. The position operator X and
						momentum operator P do not commute, but rather satisfy the canonical
						commutation relation.
					</p>
				</TextSlide>
			</div>
		</main>
	)
}
