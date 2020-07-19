import { useState, useCallback } from 'react'

/**
 * Use a callback-based element reference. This is useful when the
 * element is required for in-band rendering or effectful measuring.
 *
 */
export function useCallbackRef<T>(): [(ref: T) => void, T | null] {
	const [element, setElement] = useState<T | null>(null)
	const refCb = useCallback((node: T) => setElement(node), [setElement])
	return [refCb, element]
}
