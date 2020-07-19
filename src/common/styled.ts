import styled from 'styled-components'

export const Flexy = styled.div`
	flex: 1;
	display: flex;
`

export const Row = styled(Flexy)`
	flex-direction: row;
`

export const Col = styled(Flexy)`
	flex-direction: column;
`

export const Page = styled(Col)`
	position: relative;
`

export const Gutter = styled.div`
	width: 50px;
`
