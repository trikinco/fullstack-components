'use client'

import { useSelect } from '@trikinco/fullstack-components/client'
import { Select } from '@/src/components/Select'
import { FormEvent, useState } from 'react'
import { Input } from '@/src/components/Elements/Input'
import { Label } from '@/src/components/Elements/Label'

export function DemoSelect({ name }: { name: FormDataEntryValue }) {
	const { isLoading, isError, data } = useSelect({
		prompt: `10 nicknames for someone with the name "${name}". Include a suitable emoji in the label before the nickname label.`,
		context: 'Nickname selection',
	})

	if (isLoading) {
		return (
			<div className="text-lg text-black animate-bounce">
				Creating AI Dropdown 🤖
			</div>
		)
	}

	if (isError) {
		return 'Could not load AI Dropdown'
	}

	return <Select data={data} />
}

export default function Page() {
	const [name, setName] = useState<FormDataEntryValue>('')

	const handleSubmit = (event: FormEvent) => {
		event?.preventDefault()
		const name = new FormData(event.target as HTMLFormElement).get('name')

		if (name) {
			setName(name)
		}
	}

	if (!name) {
		return (
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<Label
					htmlFor="name"
					className="mb-3 text-lg font-normal dark:text-black"
				>
					Your name
				</Label>
				<Input
					className="border border-gray-200 dark:bg-white dark:text-black"
					id="name"
					name="name"
					minLength={1}
					maxLength={100}
				/>
				<button type="submit" className="sr-only">
					Submit
				</button>
			</form>
		)
	}

	return <DemoSelect name={name} />
}
