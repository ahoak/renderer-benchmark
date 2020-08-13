import React, { memo, useState, useEffect } from 'react'
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

		const [cData, setcData] = useState<Data[]>([])

		useEffect(() => {
			setcData(data)
		}, [setcData, data])

		return (
			<>
				<FPSCounter>{`${Math.round(lastFPS)} FPS`}</FPSCounter>
				<ChartStyle>
					<PixiContainer
						data={cData}
						width={width}
						height={height}
						duration={DURATION}
						renderer={renderer}
						pixiRenderer={Renderers.WebGL}
						setLastFPS={setLastFPS}
					/>

					<PixiContainer
						data={cData}
						width={width}
						height={height}
						duration={DURATION}
						renderer={renderer}
						pixiRenderer={Renderers.Canvas}
						setLastFPS={setLastFPS}
					/>

					<D3Container
						data={cData}
						width={width}
						height={height}
						duration={DURATION}
						renderer={renderer}
						setLastFPS={setLastFPS}
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
