import { useCallback, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import useMergeRefs from './useMergeRefs'

const ThreeBridge: React.FC = () => {
	const renderer = useMemo(() => new THREE.WebGLRenderer(), [])

	// Insert renderer element
	const ref = useRef<HTMLDivElement>()
	const callbackRef = useCallback(
		(el: HTMLDivElement) => {
			el.appendChild(renderer.domElement)
		},
		[renderer.domElement],
	)
	useEffect(() => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		const { current } = ref
		if (current == null) {
			return
		}

		current.appendChild(renderer.domElement)
		return () => {
			current.removeChild(renderer.domElement)
		}
	}, [renderer])

	// Threejs sample cube
	useEffect(() => {
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		)

		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		const cube = new THREE.Mesh(geometry, material)
		scene.add(cube)

		camera.position.z = 5

		const render = () => {
			requestAnimationFrame(render)
			renderer.render(scene, camera)
		}
		render()
	}, [renderer])

	return <div ref={useMergeRefs(ref, callbackRef)} />
}

export default ThreeBridge
