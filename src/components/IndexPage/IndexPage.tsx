import React, { memo } from 'react'
import styled from 'styled-components'
import VisualizePage from '../VisualizePage'

export const IndexPage: React.FC = memo(function IndexPage() {
	return (
		<Container>
			<VisualizePage />
		</Container>
	)
})

export default IndexPage

const Container = styled.div`
	display: flex;
	flex: 1;
	max-height: 100%;
	max-width: 100%;
	width: 100%;
	height: 100%;
	font-family: 'Gaegu', cursive;
`
