export const DEPLOYMENT_URL =
	process.env.VERCEL_ENV === 'preview'
		? `https://${process.env.VERCEL_URL}`
		: process.env.NEXT_PUBLIC_URL
