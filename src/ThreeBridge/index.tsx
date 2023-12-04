import type { PointerEventHandler } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useMeasure } from 'react-use'
import * as THREE from 'three'
import useMergeRefs from '../useMergeRefs'
import { ThreeContext } from './ThreeContext'

interface Props {
	readonly children: React.ReactNode
}

const ThreeBridge: React.FC<Props> = ({ children }) => {
	const renderer = useMemo(() => new THREE.WebGLRenderer(), [])

	// Insert renderer element
	const [measureRef, { width, height }] = useMeasure<HTMLDivElement>()
	const divRef = useRef<HTMLDivElement>(null)
	const callbackRef = useCallback(
		(el: HTMLDivElement) => {
			el.appendChild(renderer.domElement)
		},
		[renderer.domElement],
	)
	useEffect(() => {
		const { current } = divRef
		if (current == null) {
			return
		}

		renderer.setSize(width, height)
		current.appendChild(renderer.domElement)
		return () => {
			current.removeChild(renderer.domElement)
		}
	}, [height, renderer, width])

	const pointer = useMemo(() => new THREE.Vector2(NaN, NaN), [])
	const camera = useMemo(
		() => new THREE.PerspectiveCamera(75, width / height, 0.1, 1000),
		[height, width],
	)
	const scene = useMemo(() => new THREE.Scene(), [])

	// Threejs sample cube
	useEffect(() => {
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		const cube = new THREE.Mesh(geometry, material)
		scene.add(cube)

		camera.position.z = 5

		const raycaster = new THREE.Raycaster()
		let frameRequestHandle: number | null = null
		const render = () => {
			frameRequestHandle = requestAnimationFrame(render)

			raycaster.setFromCamera(pointer, camera)
			const intersects = new Set(
				raycaster
					.intersectObjects(scene.children)
					.map(intersection => intersection.object),
			)
			for (const obj of scene.children) {
				if (intersects.has(obj)) {
					obj.material.color.set(0xff0000)
				} else {
					obj.material.color.set(0x00ff00)
				}
			}

			renderer.render(scene, camera)
		}
		render()

		return () => {
			if (frameRequestHandle != null) {
				cancelAnimationFrame(frameRequestHandle)
			}
		}
	}, [camera, pointer, renderer, scene])

	const onPointerMove: PointerEventHandler<HTMLDivElement> = event => {
		// from https://threejs.org/docs/index.html#api/en/core/Raycaster
		pointer.x = (event.clientX / width) * 2 - 1
		pointer.y = -(event.clientY / height) * 2 + 1
	}

	return (
		<div
			onPointerMove={onPointerMove}
			ref={useMergeRefs(measureRef, divRef, callbackRef)}
			style={{
				height: '100vh',
				width: '100vw',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}>
			<ThreeContext.Provider value={useMemo(() => ({ scene }), [scene])}>
				{children}
			</ThreeContext.Provider>
		</div>
	)
}

export default ThreeBridge
