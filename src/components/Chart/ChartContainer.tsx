import React, { memo, useState, useEffect, useMemo } from 'react'
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
		const [toggle, setToggle] = useState<Boolean>(false)

		useEffect(() => {
			setcData(data)
		}, [setcData, data])

		const remixData = useMemo(() => {
			const remix = [...cData].reduce((acc, d) => {
				acc.push({
					...d,
					cx1: d.cx,
					cy1: d.cy,
					cx: d.cx1,
					cy: d.cy1,
				})
				return acc
			}, [] as Data[])

			return remix
		}, [cData])

		const chartData = useMemo(() => (!toggle ? remixData : data), [
			remixData,
			data,
			toggle,
		])

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
						data={chartData}
						width={width}
						height={height}
						duration={DURATION}
						renderer={renderer}
						setToggle={setToggle}
						setLastFPS={setLastFPS}
						tweenToggle={toggle}
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
