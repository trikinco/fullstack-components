import { DialogBase } from '@/src/components/DialogBase'

/**
 * Intercept generic error page
 * Shown instead of `app/@error/error/page` when `/error` loads
 * _within_ another layout
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes Intercepting Routes}
 */
export default function ErrorPageGeneric() {
	return (
		<DialogBase>
			<h1 className="text-2xl text-gray-500">Error dialog</h1>
			<div className="mt-2">
				<p className="text-sm text-gray-500">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
					dolores odio repellendus iste consequatur modi ducimus, rerum
					recusandae a quos libero pariatur itaque quae nisi explicabo earum
					facilis eius in?
				</p>
			</div>
		</DialogBase>
	)
}
