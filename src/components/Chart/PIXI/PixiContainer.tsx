import React, { memo, useMemo } from 'react'
import styled from 'styled-components'
import { Data } from '../../../hooks/useData'
import { useCallbackRef } from '../hooks/useCallbackRef'
import { usePixiInstance } from '../hooks/usePixiInstance'
import { Renderers } from '../../Controls/RendererControls'

export interface PixiContainerProps {
	data: Data[]
	width: number
	height: number
	duration: number
	renderer: Renderers
	onTransitionComplete: (metrics: any) => void
}

export const PixiContainer: React.FC<PixiContainerProps> = memo(
	function PixiContainer({
		data,
		width,
		height,
		duration,
		renderer,
		onTransitionComplete,
	}: PixiContainerProps) {
		const [setCanvasElement, canvasElement] = useCallbackRef<HTMLDivElement>()
		// setup pixi instance
		usePixiInstance({
			data,
			width,
			height,
			containerElement: canvasElement,
			duration,
			onTransitionComplete,
			renderer,
		})

		const style: React.CSSProperties = useMemo(
			() =>
				({
					visible:
						renderer === Renderers.Canvas || renderer === Renderers.WebGL
							? 'visible'
							: 'hidden',
				} as React.CSSProperties),
			[renderer],
		)
		return (
			<PixiElement
				ref={setCanvasElement}
				className="canvas-ref"
				style={style}
			/>
		)
	},
)

const PixiElement = styled.div`
	position: absolute;
`
