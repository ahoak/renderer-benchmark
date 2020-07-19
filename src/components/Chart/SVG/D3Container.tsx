import React, { memo, useMemo } from 'react'
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
}
export const D3Container: React.FC<D3RendererProps> = memo(
	function D3Container({
		data,
		duration,
		renderer,
		width,
		height,
	}: D3RendererProps) {
		// Get Refs for SVG Elements
		const [setD3ContainerElement, d3ChartContainerElement] = useCallbackRef<
			SVGGElement
		>()

		useD3Instance({
			data,
			duration,
			renderer,
			containerElement: d3ChartContainerElement,
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
