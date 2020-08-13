import React, { memo, useCallback, useState } from 'react'
import { Page } from '../../common/styled'
import styled from 'styled-components'
import { Footer } from '../Footer'
import { Controls } from '../Controls/Controls'
import { SizedToParent } from '../../utils/SizedToParent'
import { Dimensions } from '../../utils/types'
import { ChartContainer } from '../Chart/'
import { useRendererSelection } from '../../hooks/UseRendererSelection'
import { useData } from '../../hooks/useData'
const sizeStyles = { overflowY: 'hidden' } as React.CSSProperties

export const VisualizePage: React.FC<any> = memo(function VisualizePage() {
	// get dimensions from ref
	const [chartDimensions, setChartDimensions] = useState<
		Dimensions | undefined
	>(undefined)

	const handleResize = useCallback(
		({ width, height }: Dimensions) => {
			setChartDimensions({ width, height })
		},
		[setChartDimensions],
	)

	const [selectedNodeCount, setSelectedNodeCount] = useState<number>(2000)
	const onSlider = useCallback(
		(val: number) => {
			setSelectedNodeCount(val)
		},
		[setSelectedNodeCount],
	)

	const chartData = useData(selectedNodeCount, chartDimensions)
	const [selectedRenderer, onRendererChange] = useRendererSelection()

	return (
		<Container>
			<Selections>
				<Controls
					selectedRender={selectedRenderer}
					onRendererChange={onRendererChange}
					onSliderChange={onSlider}
					sliderMax={selectedNodeCount}
				/>
			</Selections>
			<Chart>
				<SizedToParent style={sizeStyles} onResize={handleResize}>
					{chartData.length > 0 && chartDimensions ? (
						<ChartContainer
							width={chartDimensions.width}
							height={chartDimensions.height}
							data={chartData}
							renderer={selectedRenderer}
						/>
					) : (
						<></>
					)}
				</SizedToParent>
			</Chart>
			<Footer />
		</Container>
	)
})

const Container = styled(Page)`
	margin: 0;
	padding: 0;
	position: relative;
	height: 100%;
	width: 100%;
	min-height: 400px;
`
const Chart = styled.div`
	position: relative;
	flex: 1;
	height: 100%;
	width: 100%;
`
const Selections = styled.div`
	height: 200px;
	position: relative;
`
