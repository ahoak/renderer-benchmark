import { createTheme } from '@fluentui/react'

// Yay pink!
export const pinkTheme = createTheme({
	defaultFontStyle: { fontFamily: "'Gaegu', cursive", fontSize: '20px' },
	palette: {
		themePrimary: '#f683ba',
		themeLighterAlt: '#0a0507',
		themeLighter: '#27151e',
		themeLight: '#492738',
		themeTertiary: '#934e6f',
		themeSecondary: '#d772a3',
		themeDarkAlt: '#f68ec0',
		themeDark: '#f79fca',
		themeDarker: '#f9b8d7',
		neutralLighterAlt: '#000000',
		neutralLighter: '#000000',
		neutralLight: '#000000',
		neutralQuaternaryAlt: '#000000',
		neutralQuaternary: '#000000',
		neutralTertiaryAlt: '#b30474',
		neutralTertiary: '#c8c8c8',
		neutralSecondary: '#d0d0d0',
		neutralPrimaryAlt: '#dadada',
		neutralPrimary: '#ffffff',
		neutralDark: '#f4f4f4',
		black: '#f8f8f8',
		white: '#000000',
	},
})
