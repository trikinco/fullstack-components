import { NextApiResponse } from 'next'
import {
	ErrorClient,
	ErrorEnhancementResponse,
} from '../../../fullstack-components/dist'

const errorClient = new ErrorClient()

function Error({
	statusCode,
	message,
	title,
}: {
	statusCode: number
	message: string
	title: string
}) {
	return (
		<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
			<div className="px-4 py-5 sm:px-6">
				<h3 className="text-lg">{title}</h3>
			</div>
			<div className="px-4 py-5 sm:p-6">
				<p className="text-base">{message}</p>
			</div>
		</div>
	)
}

Error.getInitialProps = async ({
	res,
	err,
}: {
	res: NextApiResponse
	err: any
}) => {
	let statusCode = 404
	if (res) {
		statusCode = res.statusCode
	} else if (err) {
		statusCode = err.statusCode
	}
	const errorResponse = await errorClient.handle(
		{ errorMessage: err.message, errorContext: err.stack },
		{ appContext: 'http web app' }
	)
	const parsed = JSON.parse(
		errorResponse.responseText
	) as ErrorEnhancementResponse
	return { statusCode, message: parsed.message, title: parsed.title }
}

export default Error
