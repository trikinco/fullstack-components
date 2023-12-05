export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-1234'
export const PORT = process.env.PORT || 3000
export const URL_LOCAL = `http://localhost:${PORT}`
export const URL_HOST = process.env.NEXT_PUBLIC_HOST || URL_LOCAL

// Utils
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IS_DEV = process.env.NODE_ENV === 'development'
