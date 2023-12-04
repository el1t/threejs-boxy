import { useAppDispatch } from './store/hooks'
import { addBox, selectBox, useSceneObjects } from './store/sceneSlice'
import ThreeBridge from './ThreeBridge'
import ThreeBox from './ThreeBridge/ThreeBox'

const Scene: React.FC = () => {
	const sceneObjects = useSceneObjects()
	const dispatch = useAppDispatch()
	const onClickObject = (object: THREE.Object3D) => {
		dispatch(selectBox(object.userData.id))
	}
	const onEmptyClick = (position: THREE.Vector3) => {
		dispatch(addBox({ color: 0x00ff00, position }))
	}

	return (
		<ThreeBridge onClickObject={onClickObject} onEmptyClick={onEmptyClick}>
			{sceneObjects.map(box => (
				<ThreeBox box={box} key={box.id} />
			))}
		</ThreeBridge>
	)
}

export default Scene
