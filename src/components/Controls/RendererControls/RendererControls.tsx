import * as React from 'react'
import { memo, FormEvent } from 'react'
import styled from 'styled-components'
import { IChoiceGroupOption, ChoiceGroup } from '@fluentui/react'

export enum Renderers {
	SVG = 'SVG',
	Canvas = 'Canvas',
	WebGL = 'WebGL',
}

export const RendererOptions: IChoiceGroupOption[] = [
	{
		key: Renderers.SVG,
		text: Renderers.SVG,
		imageSrc: '/images/turtle-outline.svg',
		selectedImageSrc: '/images/turtle.svg',
		imageSize: { width: 32, height: 32 },
	},
	{
		key: Renderers.Canvas,
		text: Renderers.Canvas,
		imageSrc: '/images/rabbit-outline.svg',
		selectedImageSrc: '/images/rabbit.svg',
		imageSize: { width: 32, height: 32 },
	},
	{
		key: Renderers.WebGL,
		text: Renderers.WebGL,
		imageSrc: '/images/cheetah-outline.svg',
		selectedImageSrc: '/images/cheetah.svg',
		imageSize: { width: 32, height: 32 },
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
