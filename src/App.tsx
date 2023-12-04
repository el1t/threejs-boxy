import './App.css'
import ThreeBridge from './ThreeBridge'
import ThreeBox from './ThreeBridge/ThreeBox'

function App() {
	return (
		<ThreeBridge>
			<ThreeBox color={0xffff00} depth={1} height={1} width={1} />
		</ThreeBridge>
	)
}

export default App
