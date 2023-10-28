import Image from 'next/image'
import Link from 'next/link'

export default function DemoLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<nav className="p-6">
				<Link href="/">
					<Image
						src="/images/MobiusStrip.png"
						alt="Logo"
						width={30}
						height={30}
					/>
				</Link>
			</nav>
			<main>{children}</main>
		</>
	)
}
