import { MutableRefObject } from 'react'

export interface SizedToParentProps {
	/**
	 * Ref for the element that is sized based on the parent
	 */
	sizedRef?: MutableRefObject<HTMLElement | null>

	/**
	 * Event that gets called when the size has changed
	 */
	onResize?: (dims: { width: number; height: number }) => any

	/**
	 * The children to be placed into the sized element
	 */
	children?: JSX.Element | JSX.Element[]

	/**
	 * Sets the styling on the sizing element
	 */
	style?: React.CSSProperties

	/**
	 * Sets the class name on the sizing element
	 */
	className?: string
}
export interface Dimensions {
	width: number
	height: number
}
