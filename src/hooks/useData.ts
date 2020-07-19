import { useMemo } from 'react'
import { interpolatePlasma } from 'd3-scale-chromatic'
import { Dimensions } from '../utils/types'

const MAX_RADIUS = 8
const MAX_RATE = 10

export interface Data {
	index: number
	rate: number
	r: number
	fillOpacity: number
	cx: number
	cy: number
	cx1: number
	cy1: number
	fill: string
	hex: number
}

export function useData(nodeCount: number, dimensions?: Dimensions): Data[] {
	return useMemo(() => {
		if (dimensions) {
			const { height, width } = dimensions
			const dataset = new Array(nodeCount).fill(1).map((a, index) => {
				const color = interpolatePlasma(Math.random())
				return {
					index,
					rate: 1 + Math.random() * MAX_RATE,
					r: 1 + Math.random() * MAX_RADIUS,
					fillOpacity: 1.0,
					cx: Math.random() * width,
					cy: Math.random() * height,
					cx1: Math.random() * width,
					cy1: Math.random() * height,
					fill: color,
					hex: parseColor(color),
				}
			})
			return dataset
		}
		return []
	}, [nodeCount, dimensions])
}

const parseColor = (color: string) => {
	const clean = color.replace('#', '')
	return parseInt(clean, 16)
}
