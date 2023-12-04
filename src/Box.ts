import * as THREE from 'three'

let guid = 0

const DEFAULT_BOX_SIZE = 1

interface IBox {
	readonly color: THREE.ColorRepresentation
	readonly dimensions: THREE.Vector3
	readonly id: number
	readonly isSelected: boolean
	readonly position: THREE.Vector3
}

export default class Box implements IBox {
	readonly color: THREE.ColorRepresentation
	readonly dimensions: THREE.Vector3
	readonly id: number
	readonly isSelected: boolean
	readonly position: THREE.Vector3

	constructor(
		color: THREE.ColorRepresentation,
		position: THREE.Vector3,
		dimensions?: THREE.Vector3,
		isSelected?: boolean,
	) {
		this.color = color
		this.id = guid++
		this.position = position
		this.dimensions =
			dimensions ??
			new THREE.Vector3(DEFAULT_BOX_SIZE, DEFAULT_BOX_SIZE, DEFAULT_BOX_SIZE)
		this.isSelected = isSelected ?? false
	}

	clone({
		color,
		dimensions,
		isSelected,
		position,
	}: Readonly<Partial<IBox>>): Box {
		return new Box(
			color ?? this.color,
			position ?? this.position.clone(),
			dimensions ?? this.dimensions.clone(),
			isSelected ?? this.isSelected,
		)
	}
}
