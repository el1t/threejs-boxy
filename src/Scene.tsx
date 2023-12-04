import * as THREE from 'three'
import { useAppDispatch } from './store/hooks'
import { addBoxAndSelect, selectBox, useSceneObjects } from './store/sceneSlice'
import ThreeBridge from './ThreeBridge'
import ThreeAmbientLight from './ThreeBridge/ThreeAmbientLight'
import ThreeBox from './ThreeBridge/ThreeBox'
import ThreeDirectionalLight from './ThreeBridge/ThreeDirectionalLight'

const Scene: React.FC = () => {
	const sceneObjects = useSceneObjects()
	const dispatch = useAppDispatch()
	const onClickObject = (object: THREE.Object3D) => {
		dispatch(selectBox(object.userData.id))
	}
	const onEmptyClick = (position: THREE.Vector3) => {
		dispatch(addBoxAndSelect({ color: 0x00ff00, position }))
	}

	return (
		<ThreeBridge onClickObject={onClickObject} onEmptyClick={onEmptyClick}>
			{sceneObjects.map(box => (
				<ThreeBox box={box} key={box.id} />
			))}
			<ThreeAmbientLight color={0xffffff} />
			<ThreeDirectionalLight
				color={0xffffff}
				intensity={1}
				position={new THREE.Vector3(0, 20, 3)}
				targetPosition={new THREE.Vector3(0, 0, 0)}
			/>
		</ThreeBridge>
	)
}

export default Scene
