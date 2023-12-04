import { useState } from 'react'
import Box from './Box'
import Scene from './Scene'
import Styles from './Styles'

function App() {
	const [boxes, setBoxes] = useState<readonly Box[]>([])

	return (
		<div css={styles.container}>
			<Scene css={styles.scene} data={boxes} updateData={setBoxes} />
		</div>
	)
}

const styles = Styles.create({
	container: {
		height: '100vh',
		width: '100vw',
	},
	scene: {
		height: '100%',
		width: '100%',
	},
})

export default App
