import { type NextRequest, NextResponse } from 'next/server'

const getErrorFromStatus = (status?: number) => {
	switch (status) {
		case 400:
			return 'Bad Request'
		case 401:
			return 'Unauthorized'
		case 403:
			return 'Forbidden'
		case 404:
			return 'Not Found'
		case 503:
			return 'Service Unavailable'
		case 500:
		default:
			return 'Internal Server Error'
	}
}

/**
 * Mock service for generating errors to test
 */
export async function POST(req: NextRequest) {
	const { status = 500 } = (await req?.json()) || {}
	const error = getErrorFromStatus(status)

	return NextResponse.json(
		{
			error,
		},
		{
			status,
			statusText: error,
		}
	)
}
