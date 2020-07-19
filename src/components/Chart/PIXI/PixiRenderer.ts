import * as PIXI from 'pixi.js'
import { easeCubic } from 'd3-ease'
import { Data } from '../../../hooks/useData'
import { Dimensions } from '../../../utils/types'
import { Renderers } from '../../Controls/RendererControls'

// @ts-ignore
export * from 'pixi.js-legacy'
// @ts-ignore
export * from '@pixi/canvas-renderer'

interface SpriteMap {
	[key: string]: PIXI.Sprite
}

class PixiRenderer {
	private pixiElement: HTMLElement
	private renderer: PIXI.Renderer | PIXI.CanvasRenderer
	private circleTexture: PIXI.Texture
	private nodesStage: PIXI.Container
	private stage: PIXI.Container
	private dimensions: Dimensions
	private duration: number
	private initialized = false
	private spriteMap: SpriteMap = {}
	private rendererType: Renderers
	private currDataLength = 0

	constructor(
		width: number,
		height: number,
		duration: number,
		containerEl: HTMLDivElement,
		renderer: Renderers,
	) {
		this.currDataLength = 0
		this.pixiElement = containerEl
		this.initialized = false
		this.rendererType = renderer
		this.duration = duration
		this.dimensions = { height, width }
		// ==== set up pixi stuff
		this.renderer = this.setRenderer(renderer, this.dimensions)
		const circleTemplate = new PIXI.Graphics()
			.beginFill(0xffffff)
			.lineStyle(0)
			.drawCircle(0, 0, 10)
			.endFill()
		this.circleTexture = this.renderer.generateTexture(
			circleTemplate,
			PIXI.SCALE_MODES.NEAREST,
			width / height,
		)
		// alternatively we could texture from image
		// this.circleTexture = PIXI.Texture.from('/images/cheetah.svg')
		this.pixiElement.appendChild(this.renderer.view)
		this.nodesStage = new PIXI.Container()
		this.stage = new PIXI.Container()
		this.stage.addChild(this.nodesStage)
	}

	private setRenderer(renderer: Renderers, dimensions: Dimensions) {
		// Renderer will choose webGL if supported and failover to canvas
		// For only canvas renderer use forceCanvas option but only supported with pixi-legacy module
		// alternatively can use PIXI.Application

		const pixiRender = PIXI.autoDetectRenderer({
			width: dimensions.width,
			height: dimensions.height,
			forceCanvas: renderer === Renderers.Canvas,
		})
		const rendererType =
			pixiRender.type === PIXI.RENDERER_TYPE.CANVAS ? 'CANVAS' : 'WEBGL'
		console.log('pixiRenderer', rendererType)
		return pixiRender
	}

	public getRendererType(): Renderers {
		return this.rendererType
	}

	public remove(): void {
		if (this.renderer) {
			this.stage.destroy({ children: true })
			this.pixiElement.removeChild(this.renderer.view)
			this.renderer.destroy(true)
			this.refresh()
		}
	}

	private refresh(): void {
		this.initialized = false
		this.spriteMap = {}
		this.stage.removeChild(this.nodesStage)
		this.nodesStage = new PIXI.Container()
		this.stage.addChild(this.nodesStage)
	}

	public onRendererSwitch(data: Data[]): void {
		if (this.currDataLength !== data.length) {
			this.refresh()
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
	private enter(data: Data[]): void {
		const stage = this.nodesStage
		data.forEach(node => {
			const sprite = new PIXI.Sprite(this.circleTexture)
			sprite.x = node.cx
			sprite.y = node.cy
			sprite.width = node.r * 2
			sprite.height = node.r * 2
			sprite.tint = node.hex
			this.spriteMap[`${node.index}`] = sprite
			stage.addChild(sprite)
		})
		this.renderPixi()
	}

	private updateTransition(data: Data[]) {
		const tweenRender = (newTime: number) => {
			const deltaTime = newTime - start
			const percent = deltaTime / this.duration
			data.forEach(node => {
				const sprite = this.spriteMap[`${node.index}`] as PIXI.Sprite
				// percent * (current - prev) + prev
				const cx = easeCubic(percent) * (node.cx1 - node.cx) + node.cx
				const cy = easeCubic(percent) * (node.cy1 - node.cy) + node.cy
				sprite.x = cx
				sprite.y = cy
				sprite.width = node.r * 2
				sprite.height = node.r * 2
			})
			this.renderPixi()
			if (percent < 1.0) {
				requestAnimationFrame(tweenRender)
			}
		}
		const start = performance.now()
		requestAnimationFrame(tweenRender)
	}
	private renderPixi(): void {
		this.renderer.render(this.stage)
	}

	public resize(width: number, height: number): void {
		this.dimensions.height = height
		this.dimensions.width = width
		if (this.renderer) {
			this.renderer.resize(width, height)
		}
	}
}
export default PixiRenderer
