import { select } from 'd3-selection'
import 'd3-transition'
import { Data } from '../../../hooks/useData'
import { instrumentTransition } from '../../../utils/instrumentation'

export interface D3RendererProps {
	duration: number
	svgElementRef: SVGElement
	onTransitionComplete: (metrics: any) => void
}

export class D3Renderer {
	private duration = 1000
	private svgElementRef: SVGElement
	private initialized = false
	private currDataLength = 0
	private onTransitionComplete: (metrics: any) => void

	constructor({
		duration,
		onTransitionComplete,
		svgElementRef,
	}: D3RendererProps) {
		this.duration = duration
		this.onTransitionComplete = onTransitionComplete
		this.svgElementRef = svgElementRef
	}

	private handleInstrumentationComplete(metrics: any) {
		if (this.onTransitionComplete) {
			this.onTransitionComplete(metrics)
		}
	}

	public onRendererSwitch(data: Data[]) {
		if (this.currDataLength !== data.length) {
			this.remove()
			this.currDataLength = data.length
		}
		if (!this.initialized) {
			this.enter(data)
			this.initialized = true
			this.updateTransition(data)
		} else {
			this.updateTransition(data)
		}
	}

	private enter(data: Data[]) {
		const svg = select(this.svgElementRef)
		return svg
			.selectAll('.d3-node')
			.data(data, (d: any) => d.index)
			.enter()
			.append('circle')
			.attr('class', 'd3-node')
			.attr('cx', (d: Data) => d.cx)
			.attr('cy', (d: Data) => d.cy)
			.attr('r', (d: Data) => d.r)
			.attr('fill', (d: Data) => d.fill)
			.attr('fill-opacity', (d: Data) => d.fillOpacity)
	}

	private updateTransition(data: Data[]) {
		const svg = select(this.svgElementRef)
		const transition = svg
			.selectAll('.d3-node')
			.data(data, (d: any) => d.index)
			.interrupt()
			.transition()
			.duration(this.duration)
			.attr('cx', (d: Data) => d.cx1)
			.attr('cy', (d: Data) => d.cy1)

		instrumentTransition(transition).then(metrics =>
			this.handleInstrumentationComplete(metrics),
		)
	}

	public remove() {
		const svg = select(this.svgElementRef)
		svg.selectAll('*').remove()
		this.initialized = false
	}
}
