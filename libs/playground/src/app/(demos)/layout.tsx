export default function DemoLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className="flex flex-col items-center justify-between p-6 md:p-24 min-h-screen">
			<div className="prose dark:prose-invert mx-auto">{children}</div>
		</main>
	)
}
