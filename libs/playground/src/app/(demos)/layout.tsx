import { Nav } from '@/src/components/Nav'

export default function DemoLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Nav />
			<main className="min-h-screen">{children}</main>
		</>
	)
}
