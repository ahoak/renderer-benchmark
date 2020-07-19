import React, {
	memo,
	useEffect,
	useRef,
	MutableRefObject,
	useMemo,
} from 'react'
import { useDimensions } from './useDimensions'
import { SizedToParentProps } from './types'

const DEFAULT_STYLE = {
	/* position: absolute so we don't cause the parent element to continually expand */
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	overflow: 'hidden',
} as React.CSSProperties

/**
 * Provides an element that is sized to its parent, without affecting the size of the parent.
 * It works by creating an element that is out of the layout flow (using position: absolute).
 *
 * Children should be styled with 'width: 100%, height: 100%' or use the onResize event listener to control the size of children or some other combination
 */
export const SizedToParent: React.FC<SizedToParentProps> = memo(
	({ sizedRef, onResize, children, className, style }: SizedToParentProps) => {
		const defaultRef = useRef(null)
		const ref: MutableRefObject<HTMLElement | null> = useMemo(
			() => sizedRef || defaultRef,
			[defaultRef, sizedRef],
		)
		const dims = useDimensions(ref)
		useEffect(() => {
			if (ref && dims && onResize) {
				onResize(dims)
			}
		}, [ref, dims, onResize])
		const finalStyle = useMemo(
			() => ({
				...DEFAULT_STYLE,
				...(style || {}),
			}),
			[style],
		)

		return (
			<div className={className} ref={ref as any} style={finalStyle}>
				{children}
			</div>
		)
	},
)
SizedToParent.displayName = 'SizedToParent'
