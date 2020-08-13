import React, { memo } from 'react'
import styled from 'styled-components'
import { Data } from '../../../hooks/useData'
import { useCallbackRef } from '../hooks/useCallbackRef'
import { usePixiInstance } from '../hooks/usePixiInstance'
import { Renderers } from '../../Controls/RendererControls'
import { useTweenData } from '../hooks/useTweenData'

export interface PixiContainerProps {
	data: Data[]
	width: number
	height: number
	duration: number
	renderer: Renderers
	pixiRenderer: Renderers
	setLastFPS: (fps: number) => void
}

export const PixiContainer: React.FC<PixiContainerProps> = memo(
	function PixiContainer({
		data,
		width,
		height,
		duration,
		renderer,
		pixiRenderer,
		setLastFPS,
	}: PixiContainerProps) {
		const [setCanvasElement, canvasElement] = useCallbackRef<HTMLDivElement>()
		const [chartData, handleTransitionComplete, tweenToggle] = useTweenData({
			data,
			setLastFPS,
		})

		// setup pixi instance
		usePixiInstance({
			data: chartData,
			width,
			height,
			containerElement: canvasElement,
			duration,
			onTransitionComplete: handleTransitionComplete,
			renderer,
			pixiRenderer,
			tweenToggle,
		})

		return <PixiElement ref={setCanvasElement} className="canvas-ref" />
	},
)

const PixiElement = styled.div`
	position: absolute;
`
