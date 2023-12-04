import * as THREE from 'three'
import { useScene } from './ThreeContext'
import { useEffect } from 'react'

interface Props {
	readonly color: THREE.ColorRepresentation
	readonly depth: number
	readonly height: number
	readonly width: number
}

const ThreeCube: React.FC<Props> = ({ color, depth, height, width }) => {
	const scene = useScene()

	useEffect(() => {
		const geometry = new THREE.BoxGeometry(width, height, depth)
		const material = new THREE.MeshBasicMaterial({ color })
		const cube = new THREE.Mesh(geometry, material)
		scene.add(cube)

		return () => {
			cube.removeFromParent()
		}
	}, [color, depth, height, scene, width])

	return null
}

export default ThreeCube
