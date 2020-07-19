import { useState, useEffect, useMemo, useCallback } from 'react'
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
}

export function usePixiInstance({
	data,
	width,
	height,
	containerElement,
	duration,
	renderer,
}: PixiInstance): PixiRenderer | undefined {
	const [pixiInstance, setPixiInstance] = useState<PixiRenderer | undefined>()

	// resize canvas on dimension change
	const dimensions: Dimensions = useMemo(() => {
		if (pixiInstance) {
			pixiInstance.resize(width, height)
		}
		return { width, height }
	}, [width, height, pixiInstance])

	const setUpPixi = useCallback(
		(instance?: PixiRenderer) => {
			if (renderer !== Renderers.SVG) {
				let pixiInstance = instance
				if (!pixiInstance && containerElement !== null) {
					pixiInstance = new PixiRenderer(
						dimensions.width,
						dimensions.height,
						duration,
						containerElement,
						renderer,
					)
					setPixiInstance(pixiInstance)
				}
				if (pixiInstance) {
					pixiInstance.onRendererSwitch(data)
				}
			} else {
				setPixiInstance(undefined)
			}
		},
		[containerElement, dimensions, duration, data, renderer],
	)

	useEffect(() => {
		if (pixiInstance) {
			const currentRenderer = pixiInstance.getRendererType()
			if (currentRenderer !== renderer) {
				pixiInstance.remove()
				setUpPixi()
			} else {
				pixiInstance.onRendererSwitch(data)
			}
		} else {
			setUpPixi(pixiInstance)
		}
	}, [pixiInstance, renderer, setUpPixi, data])

	return pixiInstance
}
