import { select } from 'd3-selection'
import 'd3-transition'
import { Data } from '../../../hooks/useData'
import { instrumentTransition } from '../../../utils/instrumentation'
import { Renderers } from '../../Controls/RendererControls'

export interface D3RendererProps {
	duration: number
	svgElementRef: SVGElement
	onTransitionComplete: (
		metrics: any,
		tweenToggle: boolean,
		renderer?: Renderers,
	) => void
}

export class D3Renderer {
	private duration = 1000
	private svgElementRef: SVGElement
	private initialized = false
	private currDataLength = 0
	private abortTransition = false
	private onTransitionComplete: (
		metrics: any,
		tweenToggle: boolean,
		renderer?: Renderers,
	) => void
	private inTransition = false

	constructor({
		duration,
		onTransitionComplete,
		svgElementRef,
	}: D3RendererProps) {
		this.duration = duration
		this.onTransitionComplete = onTransitionComplete
		this.svgElementRef = svgElementRef
	}

	private handleInstrumentationComplete(
		metrics: any,
		tweenToggle: boolean,
		renderer?: Renderers,
	) {
		if (this.onTransitionComplete && !this.abortTransition) {
			this.onTransitionComplete(metrics, tweenToggle, renderer)
		}
	}

	public onRendererSwitch(data: Data[], tweenToggle: boolean) {
		if (this.currDataLength !== data.length) {
			this.remove()
			this.abortTransition = false
			this.currDataLength = data.length
		}
		if (!this.inTransition) {
			this.inTransition = true
			if (!this.initialized) {
				this.enter(data)
				this.initialized = true
				this.updateTransition(data, tweenToggle, Renderers.SVG)
			} else {
				this.updateTransition(data, tweenToggle, Renderers.SVG)
			}
		}
	}

	private enter(data: Data[]) {
		const svg = select(this.svgElementRef)

		svg
			.selectAll('.d3-node')
			.data(data, (d: any) => d.index)
			.enter()
			.append('circle')
			.attr('class', 'd3-node')
			.attr('r', (d: Data) => d.r)
			.attr('fill', (d: Data) => d.fill)
			.attr('cx', (d: Data) => d.cx)
			.attr('cy', (d: Data) => d.cy)
			.attr('aria-label', (d: Data) => `circle-${d.fill}`)
			.attr('fill-opacity', (d: Data) => d.fillOpacity)
	}

	private updateTransition(
		data: Data[],
		tweenToggle: boolean,
		renderer: Renderers,
	) {
		const svg = select(this.svgElementRef)
		const transition = svg
			.selectAll('.d3-node')
			.data(data, (d: any) => d.index)
			.transition()
			.duration(this.duration)
			.attr('cx', (d: Data) => d.cx1)
			.attr('cy', (d: Data) => d.cy1)
		this.inTransition = false

		instrumentTransition(transition).then(metrics => {
			this.handleInstrumentationComplete(metrics, tweenToggle, renderer)
		})
	}

	public remove() {
		const svg = select(this.svgElementRef)
		svg.selectAll('*').remove()
		this.initialized = false
		this.abortTransition = true
	}
}
