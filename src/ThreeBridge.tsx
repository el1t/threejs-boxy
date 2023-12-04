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

	return <div ref={useMergeRefs(ref, callbackRef)} />
}

export default ThreeBridge
