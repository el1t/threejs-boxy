import * as THREE from 'three'

let guid = 0

const DEFAULT_BOX_SIZE = 1

export default class Box {
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
