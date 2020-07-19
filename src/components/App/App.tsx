import React, { memo, StrictMode } from 'react'
import IndexPage from '../IndexPage'
import { createGlobalStyle } from 'styled-components'
import './font.css'
import { loadTheme } from '@fluentui/react'
import { pinkTheme } from '../../common/theme'
loadTheme(pinkTheme)
const App: React.FC = memo(function App() {
	return (
		<StrictMode>
			<GlobalStyle />
			<IndexPage />
		</StrictMode>
	)
})
export default App

const GlobalStyle = createGlobalStyle`
	html {
		height: 100%;
		width: 100%;
		max-height: 100%;
		max-width: 100%;
		display: flex;
	}
  body {
		display: flex;
		flex: 1;
		margin: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overscroll-behavior: none;
		max-height: 100%;
		max-width: 100%;
	}
	#root {
		flex: 1;
		display: flex;
		max-height: 100%;
		max-width: 100%;
		height: 100%;
		width: 100%;
		background: black;
		color: white;
	}
`
