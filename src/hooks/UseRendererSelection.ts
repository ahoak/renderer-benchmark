import { useState, useCallback, FormEvent } from 'react'
import { IChoiceGroupOption } from '@fluentui/react'
import { Renderers } from '../components/Controls/RendererControls'

export function useRendererSelection(): [
	Renderers,
	(
		event: FormEvent<HTMLElement | HTMLInputElement> | undefined,
		option?: IChoiceGroupOption,
	) => void,
] {
	const [selectedRenderer, setSelectedRenderer] = useState<Renderers>(
		Renderers.SVG,
	)

	const onRendererChange = useCallback(
		(
			ev: FormEvent<HTMLElement | HTMLInputElement> | undefined,
			option?: IChoiceGroupOption,
		) => {
			if (option) {
				setSelectedRenderer(option.key as Renderers)
			}
		},
		[setSelectedRenderer],
	)

	return [selectedRenderer, onRendererChange]
}
