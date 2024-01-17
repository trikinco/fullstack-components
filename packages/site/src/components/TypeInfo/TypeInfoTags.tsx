import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { ExtractedTypeInfo } from '@/src/utils/getTypeDocs'
import { merge } from '@trikinco/fullstack-components/utils'
import { isValidUrl } from '@/src/utils/isValidUrl'

export interface TypeInfoTagsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	tags: ExtractedTypeInfo['tags']
	listProps?: DetailedHTMLProps<
		HTMLAttributes<HTMLUListElement>,
		HTMLUListElement
	>
}

/**
 * Renders a list of tags from a type
 */
export const TypeInfoTags = ({
	tags,
	listProps,
	...rest
}: TypeInfoTagsProps) => {
	const { className: listClassName, ...listRest } = listProps || {}

	if (!tags || (tags && tags.length === 0)) return null

	return (
		<div {...rest}>
			<ul className={merge('not-prose', listClassName)} {...listRest}>
				{tags.map(({ name, value }) => {
					const firstWord = typeof value === 'string' ? value.split(' ')[0] : ''
					const isLinkTag = name === 'link'
					const isUrl = isValidUrl(firstWord)

					return (
						<li key={name}>
							<span className="font-bold text-[--shiki-token-keyword] mr-2">
								{name}
							</span>
							{isLinkTag && !!firstWord ? (
								<a
									href={isUrl ? firstWord : `#${firstWord.toLowerCase()}`}
									className="hover:underline rounded-sm focus-ring"
								>
									{value}
								</a>
							) : (
								value
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default TypeInfoTags
