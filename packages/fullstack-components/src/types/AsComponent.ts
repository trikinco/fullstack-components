import type { ComponentProps, ElementType, ReactNode } from 'react'

/**
 * Basic setup for a polymorphic component,
 * i.e a component that allows for overriding the DOM element that will be rendered.
 *
 * @example Button component without polymorphism
 * <Button>See sauce</Button>
 * renders <button type="button">See sauce</button>
 *
 * @example Button component with polymorphism
 * <Button as={Link} href="/sauce">See sauce</Button>
 * renders <a href="/sauce">See sauce</a>
 */
export interface PolymorphicComponentBase<C extends ElementType> {
	// The element or component to turn your component into
	as?: C
	// Children within the component
	children?: ReactNode
}

/**
 * `AsComponent` is a polymorphic pattern for reusable component types,
 * with an `as` prop that can be another react component or HTML node.
 */
export type AsComponent<C extends ElementType, Props> = Props &
	Omit<ComponentProps<C>, keyof PolymorphicComponentBase<C>> &
	PolymorphicComponentBase<C>
