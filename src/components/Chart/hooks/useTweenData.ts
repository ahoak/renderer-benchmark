import { useState, useMemo, useCallback } from 'react'
import { Data } from '../../../hooks/useData'
interface TweenData {
	data: Data[]
	setLastFPS: (fps: number) => void
}

export const useTweenData = ({
	data,
	setLastFPS,
}: TweenData): [
	Data[],
	(metrics: any, tweenToggle: boolean) => void,
	boolean,
] => {
	const [toggle, setToggle] = useState<boolean>(true)

	const remixData = useMemo(() => {
		const remix = [...data].reduce((acc, d) => {
			acc.push({
				...d,
				cx1: d.cx,
				cy1: d.cy,
				cx: d.cx1,
				cy: d.cy1,
			})
			return acc
		}, [] as Data[])

		return remix
	}, [data])

	const chartData = useMemo(() => (!toggle ? remixData : data), [
		remixData,
		data,
		toggle,
	])
	const handleTransitionComplete = useCallback(
		(metrics: any, tweenToggle: boolean) => {
			setToggle(!tweenToggle)
			setLastFPS(metrics.fps)
		},
		[setLastFPS, setToggle],
	)
	return [chartData, handleTransitionComplete, toggle]
}
