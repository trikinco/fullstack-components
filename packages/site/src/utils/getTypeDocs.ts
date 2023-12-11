import ts from 'typescript'
import fs from 'fs'
import path from 'path'
import { markdownToHtml } from './markdown'

type ExtractedTypeInfo = {
	/** Name of the type/interface */
	name: string
	/** Typedoc descriptions */
	description: string | undefined
	/** The type */
	type: string
	/** Parameters if the type is a function */
	parameters: ExtractedTypeInfo[] | undefined
	/** Whether the type is required or optional */
	required: boolean
}

/**
 * An object interface or type
 */
type ExtractedTypes = Omit<ExtractedTypeInfo, 'required'> & {
	/**
	 * Each individual prop in the object type
	 */
	properties: ExtractedTypeInfo[]
}

/**
 * Parses JSDoc comments and returns clean strings
 */
function parseJSDocCommentsAndTags(
	hostNode: ts.Node,
	sourceFile: ts.SourceFile
) {
	const comment = ts
		.getJSDocCommentsAndTags(hostNode)
		.map((doc) => doc.getText(sourceFile))
		.join('')

	const extractedComments = comment.match(/\/\*\*\s*([\s\S]*?)\s*\*\//)

	const parsedComment = extractedComments?.[1]
		.replaceAll(/^\s*\*\s*/gm, '') // Remove leading asterisks and spaces on each line
		.replaceAll(/@(\w+)/g, '`$1{:sh}`')
		.trim() // Trim leading and trailing whitespace

	return parsedComment || ''
}

/**
 * Checks whether a node is a function or method
 *
 * @example function type
 * onError: (event: Event) => void
 */
function isNodeFunctionType(node: ts.Node) {
	const member = node as ts.PropertySignature

	// @note `ts.SyntaxKind` number references may change across TS versions
	return (
		// 184
		member.type?.kind === ts.SyntaxKind.FunctionType ||
		// 173
		member.type?.kind === ts.SyntaxKind.MethodSignature
	)
}

function isMatchingNodeInterface(node: ts.Node, typeName: string) {
	return (
		(ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
		node.name.text === typeName
	)
}

/**
 * Gets the node `type` name
 *
 * @example type names
 * string | number | function | unknown
 */
function getNodeType(sourceFile: ts.SourceFile, node?: ts.Node) {
	if (!node) return 'object'

	const member = node as ts.PropertySignature
	const type = member?.type?.getText(sourceFile) ?? 'unknown'

	if (!ts.isPropertySignature(member)) {
		return type
	}

	if (isNodeFunctionType(member)) {
		return 'function'
	}

	return type
}

/**
 * Gets all the properties and parameters for a node
 */
function getNodeProperty(
	node: ts.PropertySignature | ts.ParameterDeclaration,
	sourceFile: ts.SourceFile
) {
	const name = node.name.getText(sourceFile)
	const description = parseJSDocCommentsAndTags(node, sourceFile)
	const required = !node.questionToken
	const type = getNodeType(sourceFile, node)
	const parameters = getNodeParameters(node, sourceFile)

	return {
		name,
		type,
		description,
		required,
		parameters,
		// Additional handling for enum + other types can be added here
	}
}

/**
 * Recursively gets all parameters for a node
 */
function getNodeParameters(
	node: ts.Node,
	sourceFile: ts.SourceFile
): ExtractedTypeInfo[] {
	if (!ts.isPropertySignature(node) || !isNodeFunctionType(node)) return []

	const member = node.type as ts.FunctionTypeNode
	const members = member?.parameters || member?.typeParameters

	return members?.map((param) => getNodeProperty(param, sourceFile)) || []
}

/**
 * Recursively gets all parameters for a node
 */
function getTypeProperties(typeName: string, sourceFile: ts.SourceFile) {
	let properties: ExtractedTypeInfo[] = []

	ts.forEachChild(sourceFile, (node) => {
		if (!isMatchingNodeInterface(node, typeName)) return

		node.forEachChild((member) => {
			if (!ts.isPropertySignature(member)) return

			const property = getNodeProperty(member, sourceFile)
			properties.push(property)
		})
	})

	return properties
}

function getTypeDescription(typeName: string, sourceFile: ts.SourceFile) {
	let description = ''

	ts.forEachChild(sourceFile, (node) => {
		if (!isMatchingNodeInterface(node, typeName)) return

		description = parseJSDocCommentsAndTags(node, sourceFile)
	})

	return description
}

/**
 * Formats a type's comment and all it's members comments to HTML
 *
 * @consideration format parameter comments?
 */
async function formatComments(
	description: string | undefined,
	properties: ExtractedTypeInfo[]
) {
	const descriptions = [
		description,
		...properties.map((value) => value.description),
	]

	const data = await Promise.allSettled(
		descriptions.map((text) => markdownToHtml(text).then((file) => file.value))
	)
	const response = data.filter(
		(res) => res.status === 'fulfilled'
	) as PromiseFulfilledResult<string | undefined>[]

	return response
}

/**
 * Extracts type information and formats descriptions to HTML.
 *
 * @example filePath
 * 'src/components/Button.tsx'
 *
 * @note only handles simple objects like interfaces and types.
 * Does not handle parsing the heritage clauses of the interface declaration.
 * e.g extracting type info from extended interfaces and types using Pick, Omit, etc.
 */
export async function getTypeDocs(
	filePath: string,
	typeName: string
): Promise<ExtractedTypes> {
	const sourceFile = ts.createSourceFile(
		path.join(process.cwd(), filePath),
		fs.readFileSync(filePath).toString(),
		ts.ScriptTarget.ES2015,
		true
	)

	const type = getNodeType(sourceFile)
	const description = getTypeDescription(typeName, sourceFile)
	const properties = getTypeProperties(typeName, sourceFile)
	const response = await formatComments(description, properties)

	return {
		name: typeName,
		type,
		parameters: [],
		description: response[0].value,
		properties: properties.map((property, i) => ({
			name: property.name,
			type: property.type,
			required: property.required,
			parameters: property.parameters,
			description: response[i + 1].value,
		})),
	}
}

export default getTypeDocs
