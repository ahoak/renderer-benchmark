import React, { memo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Renderers } from '../Controls/RendererControls/RendererControls'
import { Data } from '../../hooks/useData'
import { PixiContainer } from './PIXI/PixiContainer'
import { D3Container } from './SVG/D3Container'

const DURATION = 1000
export interface ChartContainerProps {
	data: Data[]
	width: number
	height: number
	renderer: Renderers
}

export const ChartContainer: React.FC<ChartContainerProps> = memo(
	function ChartContainer({
		data,
		width,
		height,
		renderer,
	}: ChartContainerProps) {
		const [lastFPS, setLastFPS] = useState<number>(0)

		const handleTransitionComplete = useCallback(
			(metrics: any) => {
				setLastFPS(metrics.fps)
			},
			[setLastFPS],
		)

		return (
			<>
				<FPSCounter>{`${Math.round(lastFPS)} FPS`}</FPSCounter>
				<ChartStyle>
					<PixiContainer
						data={data}
						width={width}
						height={height}
						duration={DURATION}
						renderer={renderer}
						onTransitionComplete={handleTransitionComplete}
					/>
					<D3Container
						data={data}
						width={width}
						height={height}
						duration={DURATION}
						renderer={renderer}
						onTransitionComplete={handleTransitionComplete}
					/>
				</ChartStyle>
			</>
		)
	},
)

const FPSCounter = styled.div`
	font-size: 100px;
	margin-left: 100px;
`
const ChartStyle = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: inline-flex;
`
