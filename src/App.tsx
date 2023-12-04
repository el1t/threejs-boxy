import { useMemo, useState } from 'react'
import Box from './Box'
import Scene from './Scene'
import Styles from './Styles'
import Inspector from './Inspector'
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'

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

	const [boxes, setBoxes] = useState<readonly Box[]>([])

	return (
		<ThemeProvider theme={theme}>
			<div css={styles.container}>
				<Scene data={boxes} updateData={setBoxes} />
				<Inspector />
			</div>
		</ThemeProvider>
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
