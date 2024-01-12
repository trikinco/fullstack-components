import '../styles/globals.css'
import { ID_DIALOG_PORTAL } from '@/src/utils/constants'
import { fontClassNames } from '@/src/utils/fonts'

/**
 * Uses parallel routing to only render @error/error/page,
 * and not the children
 *
 * @note that this disables the default next js 404 page
 */
export default function RootNotFound({
	error,
}: {
	// Do not render children - only @error/error instead - see `app/layout`
	children: React.ReactNode
	/**
	 * Error page slot - see `app/@error`
	 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/parallel-routes Parallel routes}
	 */
	error: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={fontClassNames}>
				{error}
				<div id={ID_DIALOG_PORTAL} />
			</body>
		</html>
	)
}
