import * as React from 'react'
import { memo, FormEvent } from 'react'
import styled from 'styled-components'
import { IChoiceGroupOption, ChoiceGroup } from '@fluentui/react'

export enum Renderers {
	SVG = 'SVG',
	Canvas = 'Canvas',
	WebGL = 'WebGL',
}

const imageSize = { width: 32, height: 32 }

export const RendererOptions: IChoiceGroupOption[] = [
	{
		key: Renderers.SVG,
		text: Renderers.SVG,
		imageSrc: `${process.env.PUBLIC_URL}/images/turtle-outline.svg`,
		selectedImageSrc: `${process.env.PUBLIC_URL}/images/turtle.svg`,
		imageSize,
	},
	{
		key: Renderers.Canvas,
		text: Renderers.Canvas,
		imageSrc: `${process.env.PUBLIC_URL}/images/rabbit-outline.svg`,
		selectedImageSrc: `${process.env.PUBLIC_URL}/images/rabbit.svg`,
		imageSize,
	},
	{
		key: Renderers.WebGL,
		text: Renderers.WebGL,
		imageSrc: `${process.env.PUBLIC_URL}/images/cheetah-outline.svg`,
		selectedImageSrc: `${process.env.PUBLIC_URL}/images/cheetah.svg`,
		imageSize,
	},
]

interface RendererControlsProps {
	selectedRender: string
	onChange: (
		ev: FormEvent<HTMLElement | HTMLInputElement> | undefined,
		option?: IChoiceGroupOption,
	) => void
}
export const RendererControls: React.FC<RendererControlsProps> = memo(
	function RendererControls({ selectedRender, onChange }) {
		return (
			<Spacer>
				<ChoiceGroup
					selectedKey={selectedRender}
					options={RendererOptions}
					onChange={onChange}
					label="Renderer"
				/>
			</Spacer>
		)
	},
)

const Spacer = styled.div`
	margin-left: 10px;
	display: inline-table;
	font-family: 'Gaegu', cursive;
`
