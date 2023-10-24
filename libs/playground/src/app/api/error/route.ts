import { type NextRequest, NextResponse } from 'next/server'

/**
 * Mock service for generating errors to test
 */
export async function POST(req: NextRequest) {
	let error = 'Internal Server Error'

	const { status } = await req?.json()

	if (status === 400) {
		error = 'Please enter a valid name'

		return NextResponse.json(
			{
				error,
			},
			{
				status: 400,
				statusText: error,
			}
		)
	}

	// Redirect to a parallel route which can overlay the index
	return NextResponse.redirect(new URL('/error', req.url))

	// return NextResponse.json(
	// 	{
	// 		error,
	// 	},
	// 	{
	// 		status: 500,
	// 		statusText: error,
	// 	}
	// )
}
