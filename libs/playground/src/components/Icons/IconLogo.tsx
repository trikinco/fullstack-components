import { useId, type SVGAttributes } from 'react'
import { merge } from '@trikinco/fullstack-components/utils'

export const IconLogo = ({
	className,
	...rest
}: SVGAttributes<SVGSVGElement>) => {
	const id = useId()
	return (
		<svg
			viewBox="0 0 512 512"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={merge('w-5 h-5', className)}
			aria-labelledby={id}
			{...rest}
		>
			<title id={id}>{`trikin`}</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M111 238.071h85.69l-33.664 153.16c-.816 4.492-1.428 8.168-1.836 11.027-.408 2.451-.612 5.31-.612 8.577 0 10.211 1.836 19.4 5.508 27.569 3.673 8.168 8.569 15.112 14.69 20.83 6.121 5.718 13.261 10.006 21.422 12.865 8.161 3.267 16.73 4.901 25.707 4.901 17.546 0 34.072-5.309 49.578-15.929l88.75-60.038-38.561-57.588-82.017 56.363-6.121-4.289 34.276-157.448H395v-72.903H111v72.903Zm185.053-103.535L317.879 31h-77.12l-21.827 103.536h77.121Z"
				fill="currentColor"
			/>
		</svg>
	)
}
