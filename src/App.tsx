import { useMemo } from 'react'
import Scene from './Scene'
import Styles from './Styles'
import Inspector from './Inspector'
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import store from './store'
import { Provider } from 'react-redux'

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode],
	)

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<div css={styles.container}>
					<Scene />
					<Inspector />
				</div>
			</ThemeProvider>
		</Provider>
	)
}

const styles = Styles.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: '100vh',
		width: '100vw',
	},
})

export default App
