import * as THREE from 'three'

let guid = 0

const DEFAULT_BOX_SIZE = 1

export interface Box {
	readonly _tag: unique symbol
	readonly color: THREE.ColorRepresentation
	readonly dimensions: THREE.Vector3
	readonly id: number
	readonly isSelected: boolean
	readonly position: THREE.Vector3
}

export const createBox = ({
	color = 0xffffff,
	dimensions = new THREE.Vector3(
		DEFAULT_BOX_SIZE,
		DEFAULT_BOX_SIZE,
		DEFAULT_BOX_SIZE,
	),
	isSelected = false,
	position = new THREE.Vector3(0, 0, 0),
}: Readonly<Partial<Box>>): Box =>
	({
		color,
		dimensions,
		id: guid++,
		isSelected,
		position,
	}) as Box
