/**
 * Generic error page
 */
export default function ErrorPageGeneric() {
	return (
		<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 sm:w-full sm:max-w-xl shadow-xl rounded-xl">
					<div className="sm:flex sm:items-start">
						<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
							<h1 className="text-2xl text-gray-500">Error page</h1>
							<div className="mt-2">
								<p className="text-sm text-gray-500">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Inventore dolores odio repellendus iste consequatur modi
									ducimus, rerum recusandae a quos libero pariatur itaque quae
									nisi explicabo earum facilis eius in?
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
