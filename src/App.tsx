import { useState } from 'react'
import './App.css'
import Box from './Box'
import Scene from './Scene'

function App() {
	const [boxes, setBoxes] = useState<readonly Box[]>([])

	return <Scene data={boxes} updateData={setBoxes} />
}

export default App
