import React, { memo, useMemo } from 'react'
import { useCallbackRef } from '../hooks/useCallbackRef'
import { Data } from '../../../hooks/useData'
import { Renderers } from '../../Controls/RendererControls'
import { useD3Instance } from '../hooks/useD3Instance'
import { useTweenData } from '../hooks/useTweenData'
export interface D3RendererProps {
	data: Data[]
	duration: number
	renderer: Renderers
	width: number
	height: number
	setLastFPS: (fps: number) => void
}
export const D3Container: React.FC<D3RendererProps> = memo(
	function D3Container({
		data,
		duration,
		renderer,
		width,
		height,
		setLastFPS,
	}: D3RendererProps) {
		// Get Refs for SVG Elements
		const [setD3ContainerElement, d3ChartContainerElement] = useCallbackRef<
			SVGGElement
		>()
		const [chartData, handleTransitionComplete, tweenToggle] = useTweenData({
			data,
			setLastFPS,
		})

		useD3Instance({
			data: chartData,
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
				<svg width={width} height={height} role="img">
					<title> SVG Implementation of Benchmarking application</title>
					<desc id="desc">
						{' '}
						Show increasing number of circles based on user selection
					</desc>
					<g ref={setD3ContainerElement} className="svg-test"></g>
				</svg>
			</div>
		)
	},
)
