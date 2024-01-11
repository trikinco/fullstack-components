import Link from 'next/link'
import { merge } from '@trikinco/fullstack-components/utils'
import { Card } from '@/src/components/Card'
import type { RoutesWithMeta } from '@/src/utils/routes'
import type { HTMLAttributes } from 'react'

export interface CardsProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Whether to allow individual cards to be full-width
	 */
	hasFullWidth?: boolean
	/**
	 * Whether all cards should be full-width
	 */
	allFullWidth?: boolean
	/**
	 * The routes to display cards for
	 */
	routes: RoutesWithMeta[]
}

/**
 * Cards listing of all `routes`
 */
export function Cards({
	hasFullWidth,
	allFullWidth,
	className,
	routes,
}: CardsProps) {
	return (
		<div
			className={merge(
				'not-prose',
				'w-full max-w-6xl',
				'grid gap-6 sm:grid-cols-2',
				className
			)}
		>
			{routes.map(
				({
					href,
					title,
					variant,
					image,
					header,
					footer,
					children,
					className,
					isFullWidth,
				}) => (
					<article
						key={href}
						className={merge(
							'flex',
							((hasFullWidth && isFullWidth) || allFullWidth) && 'col-span-full'
						)}
					>
						<Card
							as={Link}
							href={href}
							title={title}
							image={image}
							header={header}
							footer={footer}
							className={merge(
								((hasFullWidth && isFullWidth) || allFullWidth) &&
									'sm:max-w-none',
								className
							)}
							isFullWidth={allFullWidth || isFullWidth}
							variant={variant}
							component="h3"
						>
							<p
								className={merge(
									'text-sm sm:text-base',
									variant === 'primary' && 'sm:text-lg'
								)}
							>
								{children}
							</p>
						</Card>
					</article>
				)
			)}
		</div>
	)
}

export default Cards
