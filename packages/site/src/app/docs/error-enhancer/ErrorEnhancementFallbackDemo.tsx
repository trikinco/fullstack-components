'use client'

import { ErrorEnhancementFallback } from '@trikinco/fullstack-components/client'

export default function Page() {
	return (
		<ErrorEnhancementFallback
			error={new Error('Failed to get more cowbell')}
			resetErrorBoundary={() => null}
		/>
	)
}
