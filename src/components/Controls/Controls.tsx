import React, { memo } from 'react'
import styled from 'styled-components'
import { IChoiceGroupOption } from '@fluentui/react'
import { RendererControls } from './RendererControls'
import { ControlledSlider } from './ControlledSlider'

interface ControlsProps {
	selectedRender: string
	onRendererChange: (
		ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
		option?: IChoiceGroupOption,
	) => void
	sliderMax: number
	onSliderChange: (val: number) => void
}

export const Controls: React.FC<any> = memo(function Controls({
	selectedRender,
	onRendererChange,
	sliderMax,
	onSliderChange,
}: ControlsProps) {
	return (
		<ControlStyles>
			<RendererControls
				selectedRender={selectedRender}
				onChange={onRendererChange}
			/>
			<ControlledSlider
				sliderValue={sliderMax}
				sliderOnChange={onSliderChange}
				sliderSettings={{ min: 500, max: 10000 }}
			/>
		</ControlStyles>
	)
})

const ControlStyles = styled.div`
	display: 'inline-flex';
	margin-left: 100px;
`
