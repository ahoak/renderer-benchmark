import { useState, useCallback, useLayoutEffect } from 'react'
import { Data } from '../../../hooks/useData'
import { Renderers } from '../../Controls/RendererControls'
import PixiRenderer from '../PIXI/PixiRenderer'
import { D3Renderer } from '../SVG/D3Renderer'

export interface D3Instance {
	data: Data[]
	containerElement: SVGGElement | null
	duration: number
	renderer: Renderers
	onTransitionComplete: (metrics: any, tweenToggle: Boolean) => void
	tweenToggle: Boolean
}

export function useD3Instance({
	data,
	containerElement,
	duration,
	renderer,
	onTransitionComplete,
	tweenToggle,
}: D3Instance): D3Renderer | undefined {
	const [D3Instance, setD3Instance] = useState<D3Renderer | undefined>()

	const setUpSVG = useCallback(
		(instance?: PixiRenderer) => {
			if (!instance && containerElement !== null) {
				const D3Instance = new D3Renderer({
					duration,
					onTransitionComplete,
					svgElementRef: containerElement,
				})
				setD3Instance(D3Instance)
			}
		},
		[containerElement, duration, onTransitionComplete],
	)

	useLayoutEffect(() => {
		if (D3Instance) {
			if (renderer !== Renderers.SVG) {
				D3Instance.remove()
				setD3Instance(undefined)
			} else {
				D3Instance.onRendererSwitch(data, tweenToggle)
			}
		} else {
			if (renderer === Renderers.SVG) {
				setUpSVG(D3Instance)
			}
		}
	}, [renderer, D3Instance, setUpSVG, data, tweenToggle])

	return D3Instance
}
