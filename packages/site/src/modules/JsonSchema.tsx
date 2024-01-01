export interface JsonSchemaProps {
	/** item type */
	type: string
	/** item name */
	name?: string
	/** item description - short */
	description?: string
	/** absolute URL */
	url?: string
	/** `@id` */
	id?: string
	[key: string]: any
}

/**
 * Meta component with JSON+LD Schema markup for enhanced SEO.
 *
 */
export const JsonSchema = ({
	id,
	type,
	name,
	description,
	url,
	...rest
}: JsonSchemaProps) => {
	/**
	 * JSON+LD schema for advanced structured data
	 * https://developers.google.com/search/docs/advanced/structured-data/article#non-amp
	 *  */
	const schema = {
		'@context': 'https://schema.org',
		'@type': type,
		'@id': id,
		name,
		description,
		url,
		...rest,
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	)
}
