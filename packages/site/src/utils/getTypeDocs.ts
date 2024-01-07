import {
	createLinker,
	isFunctionSchema,
	type ICodeSchema,
	type SchemaTypes,
} from '@wix/typescript-schema-extract'

export type ExtractedTagValue = string | number | boolean

/**
 * JSDoc tags that are extracted from a type
 */
export type ExtractedTags = {
	note?: ExtractedTagValue
	see?: ExtractedTagValue
	example?: ExtractedTagValue
	link?: ExtractedTagValue
	extends?: ExtractedTagValue
}

export type ExtractedTypeInfo = {
	/** Name of the type/interface */
	name: string
	/** Typedoc descriptions */
	description: string | undefined
	/** The type */
	type: string
	/**
	 * Arguments if the type is a function
	 */
	parameters?: ExtractedTypeInfo[] | undefined
	/**
	 * Each individual prop for nested types
	 */
	properties?: ExtractedTypeInfo[] | undefined
	/**
	 * Return values if the type is a function
	 */
	returns?: ExtractedTypeInfo | string | undefined
	/** Whether the type is required or optional */
	required?: boolean
	/**
	 * Extracted JSdoc tags
	 */
	tags?: {
		name: string
		value: ExtractedTagValue
	}[]
}

type TaggableSchema = ICodeSchema & ExtractedTags

/**
 * Type guard that checks if a schema/type may have JSDoc tags
 */
export function isTaggableSchema(
	schema?: TaggableSchema | null
): schema is TaggableSchema {
	return (
		!!schema &&
		typeof schema === 'object' &&
		(schema.example !== undefined ||
			schema.note !== undefined ||
			schema.see !== undefined ||
			schema.link !== undefined ||
			schema.extends !== undefined ||
			schema.default !== undefined)
	)
}

/**
 * Cleans up a $ref value generated for a type by `@wix/typescript-schema-extract`
 */
const cleanRef = (ref?: string) =>
	ref?.split('#').pop()?.split(' ').pop()?.split('!').pop()?.trim()

/**
 * Extracts and cleans up the type name from a type
 */
const getTypeName = (node: SchemaTypes) => {
	const base = node['$ref']?.includes('#') ? '' : node['$ref']?.split('/').pop()
	const oneOf = node.oneOf
		?.map(
			(node) => node.type || node['$ref']?.split('/').pop()?.split('#').pop()
		)
		.join(' | ')

	const union = node.enum?.join(' | ')

	let type =
		union ||
		base ||
		(node.type as string) ||
		oneOf ||
		/**
		 * If no other type names are found, use the $ref
		 * since it's probably a linked type that has been flattened
		 * @example ref value '../fullstack-components/dist/hooks/useRequest#type UseRequestConsumerConfig'
		 */
		cleanRef(node['$ref']) ||
		''

	// Use a switch here if more cases are added
	if (type === 'PromiseConstructor') {
		type = 'Promise'
	}

	// Combine the type with any generic arguments into a single string
	if (node.genericArguments?.length) {
		const genericArguments = node.genericArguments
			?.map((item) => cleanRef(item['$ref']) || item.type)
			.filter(Boolean)

		if (genericArguments?.length) {
			return `${type}<${genericArguments.join(', ')}>`
		}
	}

	return type?.split('React.').pop() || type
}

/**
 * Extracts JSDoc tags from a type comment
 */
const getItemTags = (item: ICodeSchema) => {
	let tags: ExtractedTypeInfo['tags'] = []

	if (isTaggableSchema(item)) {
		tags = [
			{ name: 'example', value: item?.example },
			{ name: 'note', value: item?.note },
			{ name: 'see', value: item?.see },
			{ name: 'link', value: item?.link },
			{ name: 'extends', value: item?.extends },
			{ name: 'default', value: item?.default },
		].filter(
			(tag) =>
				typeof tag.value === 'string' ||
				typeof tag.value === 'number' ||
				typeof tag.value === 'boolean'
		) as ExtractedTypeInfo['tags']
	}

	return tags
}

/**
 * Extracts arguments from a function schema
 */
const getItemArguments = (item: ICodeSchema, typeName?: string) => {
	let parameters = undefined

	if (isFunctionSchema(item)) {
		parameters = item.arguments?.map((argument) =>
			getExtractedTypeInfo(argument, typeName, item)
		)
	}

	return parameters
}

/**
 * Extracts type info from a schema
 */
const getExtractedTypeInfo = (
	item: ICodeSchema,
	typeName?: string,
	schema?: SchemaTypes
): ExtractedTypeInfo => {
	const type = getTypeName(item)
	const tags = getItemTags(item)
	const parameters = getItemArguments(item, typeName)
	const name = item.name || typeName || ''
	const description = item.description as string
	const required = isFunctionSchema(schema)
		? schema.requiredArguments?.includes(name)
		: false
	const properties = Object.entries(item.properties || {}).map(([key, value]) =>
		getExtractedTypeInfo(value, key, item)
	)
	let returns: ExtractedTypeInfo | string | undefined =
		isFunctionSchema(item) && item.returns
			? getExtractedTypeInfo(item.returns, typeName, schema)
			: undefined

	if (
		isFunctionSchema(item) &&
		item.returns &&
		returns?.properties &&
		returns.properties.length === 0
	) {
		returns = getTypeName(item.returns)
	}

	return {
		name,
		type,
		description,
		parameters,
		properties,
		required,
		returns,
		tags,
	}
}

/**
 * Extracts type info from a d.ts file
 */
export function getTypeDocs(
	filePath: string,
	typeName: string
): ExtractedTypeInfo {
	const files = [filePath]
	const linker = createLinker(files)
	const schema = linker.flatten(files[0], typeName)
	const data = getExtractedTypeInfo(schema, typeName)

	return data
}

export default getTypeDocs
