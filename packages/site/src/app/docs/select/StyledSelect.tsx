import { Select } from '@trikinco/fullstack-components'
import { merge } from '@trikinco/fullstack-components/utils'

export default async function Page() {
	return (
		<Select
			prompt="The Fellowship Of The Ring"
			context="Playable character for a LOTR game"
			className={merge(
				'bg-blue-800 dark:bg-blue-300',
				'dark:text-black border-none rounded-xl'
			)}
		/>
	)
}
