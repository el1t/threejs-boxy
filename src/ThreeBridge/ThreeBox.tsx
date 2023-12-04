import * as THREE from 'three'
import { useScene } from './ThreeContext'
import { useEffect } from 'react'
import Box from '../Box'

interface Props {
	readonly box: Box
}

const ThreeCube: React.FC<Props> = ({ box }) => {
	const scene = useScene()
	const { color, dimensions, id, isSelected, position } = box
	const { x: width, y: height, z: depth } = dimensions

	useEffect(() => {
		const geometry = new THREE.BoxGeometry(width, height, depth)
		const material = new THREE.MeshBasicMaterial({ color })
		const cube = new THREE.Mesh(geometry, material)
		cube.position.set(position.x, position.y, position.z)
		cube.userData.id = id
		cube.userData.isSelected = isSelected
		scene.add(cube)

		return () => {
			cube.removeFromParent()
		}
	}, [
		color,
		depth,
		height,
		id,
		isSelected,
		position.x,
		position.y,
		position.z,
		scene,
		width,
	])

	return null
}

export default ThreeCube
