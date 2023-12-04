import { useState } from 'react'
import './App.css'
import ThreeBridge from './ThreeBridge'
import ThreeBox from './ThreeBridge/ThreeBox'
import * as THREE from 'three'

let guid = 0

const DEFAULT_BOX_SIZE = 1

class Box {
	readonly color: THREE.ColorRepresentation
	readonly dimensions: THREE.Vector3 = new THREE.Vector3(
		DEFAULT_BOX_SIZE,
		DEFAULT_BOX_SIZE,
		DEFAULT_BOX_SIZE,
	)
	readonly id: number
	readonly position: THREE.Vector3

	constructor(color: THREE.ColorRepresentation, position: THREE.Vector3) {
		this.color = color
		this.id = guid++
		this.position = position
	}
}

function App() {
	const [boxes, setBoxes] = useState<readonly Box[]>([])
	const onClickObject = (object: THREE.Object3D) => {
		setBoxes([
			...boxes,
			new Box(
				0xff00ff,
				object.position
					.clone()
					.add(object.up.clone().normalize().multiplyScalar(1.1)),
			),
		])
	}
	const onEmptyClick = (position: THREE.Vector3) => {
		setBoxes([...boxes, new Box(0x00ff00, position)])
	}

	return (
		<ThreeBridge onClickObject={onClickObject} onEmptyClick={onEmptyClick}>
			{boxes.map(box => (
				<ThreeBox
					color={box.color}
					dimensions={box.dimensions}
					key={box.id}
					position={box.position}
				/>
			))}
		</ThreeBridge>
	)
}

export default App
