import * as THREE from 'three'
import { useScene } from './ThreeContext'
import { useEffect } from 'react'

interface Props {
	readonly color: THREE.ColorRepresentation
	readonly dimensions: THREE.Vector3
	readonly position: THREE.Vector3
}

const ThreeCube: React.FC<Props> = ({ color, dimensions, position }) => {
	const scene = useScene()
	const { x: width, y: height, z: depth } = dimensions

	useEffect(() => {
		const geometry = new THREE.BoxGeometry(width, height, depth)
		const material = new THREE.MeshBasicMaterial({ color })
		const cube = new THREE.Mesh(geometry, material)
		cube.position.set(position.x, position.y, position.z)
		scene.add(cube)

		return () => {
			cube.removeFromParent()
		}
	}, [color, depth, height, position.x, position.y, position.z, scene, width])

	return null
}

export default ThreeCube
