import { type NextRequest, NextResponse } from 'next/server'

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

	return NextResponse.json(
		{
			error,
		},
		{
			status: 500,
			statusText: error,
		}
	)
}
