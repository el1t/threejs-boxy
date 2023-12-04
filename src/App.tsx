import { useState } from 'react'
import './App.css'
import ThreeBridge from './ThreeBridge'
import ThreeBox from './ThreeBridge/ThreeBox'
import * as THREE from 'three'

let guid = 0

class Box {
	readonly color: THREE.ColorRepresentation
	readonly dimensions: THREE.Vector3
	readonly id: number
	readonly position: THREE.Vector3

	constructor(
		color: THREE.ColorRepresentation,
		dimensions: THREE.Vector3,
		position: THREE.Vector3,
	) {
		this.color = color
		this.dimensions = dimensions
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
				new THREE.Vector3(1, 1, 1),
				object.position.clone().add(object.up.clone().multiplyScalar(1.1)),
			),
		])
	}
	const onEmptyClick = (position: THREE.Vector3) => {
		setBoxes([
			...boxes,
			new Box(0x00ff00, new THREE.Vector3(1, 1, 1), position),
		])
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
