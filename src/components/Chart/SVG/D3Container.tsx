import React, { memo, useMemo, useCallback } from 'react'
import { useCallbackRef } from '../hooks/useCallbackRef'
import { Data } from '../../../hooks/useData'
import { Renderers } from '../../Controls/RendererControls'
import { useD3Instance } from '../hooks/useD3Instance'
export interface D3RendererProps {
	data: Data[]
	duration: number
	renderer: Renderers
	width: number
	height: number
	tweenToggle: Boolean
	setToggle: (toggleState: Boolean) => void
	setLastFPS: (fps: number) => void
}
export const D3Container: React.FC<D3RendererProps> = memo(
	function D3Container({
		data,
		duration,
		renderer,
		width,
		height,
		tweenToggle,
		setToggle,
		setLastFPS,
	}: D3RendererProps) {
		// Get Refs for SVG Elements
		const [setD3ContainerElement, d3ChartContainerElement] = useCallbackRef<
			SVGGElement
		>()

		const handleTransitionComplete = useCallback(
			(metrics: any, tweenToggle: Boolean) => {
				if (renderer === Renderers.SVG) {
					setToggle(!tweenToggle)
					setLastFPS(metrics.fps)
				}
			},
			[setLastFPS, setToggle, renderer],
		)

		useD3Instance({
			data,
			duration,
			renderer,
			containerElement: d3ChartContainerElement,
			onTransitionComplete: handleTransitionComplete,
			tweenToggle,
		})

		const style = useMemo(
			() =>
				({
					visible: renderer === Renderers.SVG ? 'visible' : 'hidden',
				} as React.CSSProperties),
			[renderer],
		)

		return (
			<div style={style}>
				<svg width={width} height={height}>
					<g ref={setD3ContainerElement} className="svg-test"></g>
				</svg>
			</div>
		)
	},
)
