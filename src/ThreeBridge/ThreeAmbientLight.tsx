import * as THREE from 'three'
import { useScene } from './ThreeContext'
import { useEffect } from 'react'

interface Props {
	readonly color: THREE.ColorRepresentation
}

const ThreeAmbientLight: React.FC<Props> = ({ color }) => {
	const scene = useScene()

	useEffect(() => {
		const light = new THREE.AmbientLight(color)
		scene.add(light)

		return () => {
			light.removeFromParent()
		}
	}, [color, scene])

	return null
}

export default ThreeAmbientLight
