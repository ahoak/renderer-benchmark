import { useState, useMemo, useCallback, useLayoutEffect } from 'react'
import PixiRenderer from '../PIXI/PixiRenderer'
import { Dimensions } from '../../../utils/types'
import { Data } from '../../../hooks/useData'
import { Renderers } from '../../Controls/RendererControls'

export interface PixiInstance {
	data: Data[]
	containerElement: HTMLDivElement | null
	width: number
	height: number
	duration: number
	renderer: Renderers
	pixiRenderer: Renderers
	onTransitionComplete: (metrics: any, tweenToggle: boolean) => void
	tweenToggle: boolean
}

export function usePixiInstance({
	data,
	width,
	height,
	containerElement,
	duration,
	renderer,
	pixiRenderer,
	onTransitionComplete,
	tweenToggle,
}: PixiInstance): PixiRenderer | undefined {
	const [pixiInstance, setPixiInstance] = useState<PixiRenderer | undefined>()

	// resize canvas on dimension change
	const dimensions: Dimensions = useMemo(() => {
		if (pixiInstance) {
			pixiInstance.resize(width, height)
		}
		return { width, height }
	}, [width, height, pixiInstance])

	const setUpPixi = useCallback(() => {
		if (renderer === pixiRenderer) {
			if (containerElement !== null) {
				const pixiInstance = new PixiRenderer(
					dimensions.width,
					dimensions.height,
					duration,
					containerElement,
					onTransitionComplete,
					renderer,
				)
				setPixiInstance(pixiInstance)
			}
		}
	}, [
		containerElement,
		dimensions,
		duration,
		renderer,
		onTransitionComplete,
		pixiRenderer,
	])

	useLayoutEffect(() => {
		if (pixiInstance) {
			const currentRenderer = pixiInstance.getRendererType()
			if (currentRenderer !== renderer) {
				pixiInstance.cancel()
				setPixiInstance(undefined)
			} else {
				pixiInstance.onRendererSwitch(data, tweenToggle)
			}
		} else {
			setUpPixi()
		}
	}, [pixiInstance, renderer, setUpPixi, data, tweenToggle])

	return pixiInstance
}
