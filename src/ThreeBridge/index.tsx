import type { MouseEventHandler, PointerEventHandler } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useMeasure } from 'react-use'
import * as THREE from 'three'
import useMergeRefs from '../useMergeRefs'
import { ThreeContext } from './ThreeContext'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import Styles from '../Styles'

const CAMERA_FOV = 75
const CAMERA_DISTANCE = 5

interface Props {
	readonly className?: string
	readonly children: React.ReactNode
	readonly onClickObject: (object: THREE.Object3D) => void
	readonly onEmptyClick: (location: THREE.Vector3) => void
}

const ThreeBridge: React.FC<Props> = ({
	className,
	children,
	onClickObject,
	onEmptyClick,
}) => {
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
		renderer.setSize(width, height)
	}, [height, renderer, width])

	const pointer = useMemo(() => new THREE.Vector2(NaN, NaN), [])
	const camera = useMemo(() => {
		const cam = new THREE.PerspectiveCamera(
			CAMERA_FOV,
			width / height,
			0.1,
			1000,
		)
		cam.position.z = CAMERA_DISTANCE
		return cam
	}, [height, width])
	const scene = useMemo(() => new THREE.Scene(), [])
	const outlinePass = useMemo(
		() =>
			new OutlinePass(
				new THREE.Vector2(width, height), //resolution parameter
				scene,
				camera,
			),
		[camera, height, scene, width],
	)

	useEffect(() => {
		// post-processing for selection outlines
		const raycaster = new THREE.Raycaster()
		const composer = new EffectComposer(renderer)
		const renderPass = new RenderPass(scene, camera)
		composer.addPass(renderPass)
		composer.addPass(outlinePass)

		let frameRequestHandle: number | null = null
		const render = () => {
			frameRequestHandle = requestAnimationFrame(render)

			// detect selection(s)
			raycaster.setFromCamera(pointer, camera)
			const intersects = raycaster
				.intersectObjects(scene.children)
				.map(intersection => intersection.object)
			outlinePass.selectedObjects = intersects

			composer.render()
		}
		render()

		return () => {
			if (frameRequestHandle != null) {
				cancelAnimationFrame(frameRequestHandle)
			}
		}
	}, [camera, outlinePass, pointer, renderer, scene])

	// Detect clicks and translate to world coordinates
	const onClick: MouseEventHandler<HTMLDivElement> = event => {
		const x = (event.clientX / width) * 2 - 1
		const y = -(event.clientY / height) * 2 + 1
		const location = new THREE.Vector2(x, y)
		const raycaster = new THREE.Raycaster()
		raycaster.setFromCamera(location, camera)
		const intersects = raycaster
			.intersectObjects(scene.children)
			.map(intersection => intersection.object)
		if (intersects.length === 0) {
			// did not click on existing geometry
			const emptyLocation = new THREE.Vector3()
			raycaster.ray.at(CAMERA_DISTANCE, emptyLocation)
			onEmptyClick(emptyLocation)
		} else {
			for (const intersect of intersects) {
				onClickObject(intersect)
			}
		}
	}

	const onPointerMove: PointerEventHandler<HTMLDivElement> = event => {
		// from https://threejs.org/docs/index.html#api/en/core/Raycaster
		pointer.x = (event.clientX / width) * 2 - 1
		pointer.y = -(event.clientY / height) * 2 + 1
	}

	return (
		<div
			className={className}
			css={styles.container}
			onClick={onClick}
			onPointerMove={onPointerMove}
			ref={useMergeRefs(measureRef, divRef, callbackRef)}>
			<ThreeContext.Provider value={useMemo(() => ({ scene }), [scene])}>
				{children}
			</ThreeContext.Provider>
		</div>
	)
}

const styles = Styles.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
})

export default ThreeBridge
