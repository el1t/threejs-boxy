import * as THREE from 'three'
import { useScene } from './ThreeContext'
import { useEffect } from 'react'

interface Props {
	readonly color: THREE.ColorRepresentation
	readonly intensity: number
	readonly position: THREE.Vector3
	readonly targetPosition: THREE.Vector3
}

const ThreeDirectionalLight: React.FC<Props> = ({
	color,
	intensity,
	position,
	targetPosition,
}) => {
	const scene = useScene()

	useEffect(() => {
		const light = new THREE.DirectionalLight(color, intensity)
		light.position.set(position.x, position.y, position.z)
		const lightTarget = new THREE.Object3D()
		lightTarget.position.set(
			targetPosition.x,
			targetPosition.y,
			targetPosition.z,
		)

		light.target = lightTarget
		scene.add(lightTarget)
		scene.add(light)

		return () => {
			light.removeFromParent()
		}
	}, [color, intensity, position, scene, targetPosition])

	return null
}

export default ThreeDirectionalLight
