import type { HTMLAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

/**
 * https://www.svgrepo.com/collection/dazzle-line-icons/
 */
export const IconEclipse = ({
	className,
	...rest
}: HTMLAttributes<SVGSVGElement>) => (
	<svg
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		className={merge('w-5 h-5', className)}
		fill="none"
		aria-hidden="true"
		{...rest}
	>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="m13.11 19.295-.395.785c-.23.458-.346.686-.501.76a.5.5 0 0 1-.428 0c-.155-.074-.27-.302-.5-.76l-1.194-2.37c-.11-.22-.166-.33-.25-.398a.5.5 0 0 0-.26-.107c-.11-.011-.226.028-.459.106l-2.607.874c-.507.17-.761.256-.926.195a.5.5 0 0 1-.303-.312c-.055-.167.039-.418.225-.92l.87-2.34c.091-.247.137-.37.126-.484a.5.5 0 0 0-.113-.273c-.073-.088-.193-.142-.432-.25l-2.36-1.073c-.509-.231-.764-.347-.843-.507a.5.5 0 0 1 0-.442c.08-.16.334-.276.843-.507l2.36-1.072c.24-.109.359-.163.432-.251a.5.5 0 0 0 .113-.273c.011-.114-.035-.237-.126-.483l-.87-2.341c-.186-.502-.28-.753-.225-.92a.5.5 0 0 1 .303-.312c.165-.06.419.025.926.195l2.607.874c.233.078.35.117.458.106a.5.5 0 0 0 .26-.107c.085-.068.14-.178.251-.398l1.194-2.37c.23-.458.345-.686.5-.76a.5.5 0 0 1 .428 0c.155.074.27.302.5.76l.396.785M9.764 10A2.989 2.989 0 0 0 9 12c0 .768.289 1.47.764 2M22 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
		/>
	</svg>
)
