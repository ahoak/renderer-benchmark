import { useState, useEffect, useCallback } from 'react'
import { Data } from '../../../hooks/useData'
import { Renderers } from '../../Controls/RendererControls'
import PixiRenderer from '../PIXI/PixiRenderer'
import { D3Renderer } from '../SVG/D3Renderer'

export interface D3Instance {
	data: Data[]
	containerElement: SVGGElement | null
	duration: number
	renderer: Renderers
	onTransitionComplete: (metrics: any) => void
}

export function useD3Instance({
	data,
	containerElement,
	duration,
	renderer,
	onTransitionComplete,
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

	useEffect(() => {
		if (D3Instance) {
			if (renderer !== Renderers.SVG) {
				D3Instance.remove()
			} else {
				D3Instance.onRendererSwitch(data)
			}
		} else {
			setUpSVG(D3Instance)
		}
	}, [D3Instance, renderer, setUpSVG, data])

	return D3Instance
}
