/**
 * Instruments a d3 transition by hooking into the tween factory.
 * See: https://github.com/d3/d3-transition#control-flow
 * When you specify a tween function, you provide a factory that is called for each element.
 * That factory is expected to return an easing function to tween the element, which is called at each frame.
 * It is called for each element in the selection, so we're using the selection size to trigger updates when the last one is called for each frame.
 * This lets us track the frame count, and binding to the transition's end event (also looking for last element) let's us determine when it is complete.
 */
export const instrumentTransition = (transition: any) => {
	return new Promise((resolve, reject) => {
		let frames = 0
		const start = performance.now()
		const size = transition.size()
		transition
			.tween('_framerate_', (d: any, i: number) => {
				return (t: any) => {
					if (i === size - 1) {
						frames++
					}
				}
			})
			.on('end.instrument', (d: any, i: number) => {
				if (i === size - 1) {
					const end = performance.now()
					const delta = end - start
					resolve({
						start,
						end,
						delta,
						frames,
						fps: frames / (delta / 1000),
					})
				}
			})
	})
}
