export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-1234'
export const URL_HOST =
	process.env.VERCEL_ENV === 'preview'
		? `https://${process.env.VERCEL_URL}`
		: process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'
