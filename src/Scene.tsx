import Box from './Box'
import ThreeBridge from './ThreeBridge'
import ThreeBox from './ThreeBridge/ThreeBox'

interface Props {
	readonly className?: string
	readonly data: readonly Box[]
	readonly updateData: (newBoxes: readonly Box[]) => void
}

const Scene: React.FC<Props> = ({ data, updateData }) => {
	const onClickObject = (object: THREE.Object3D) => {
		const selectedId = object.userData.id
		updateData(
			data.map(obj => {
				if (selectedId === obj.id) {
					return obj.clone({ isSelected: true })
				} else if (obj.isSelected) {
					return obj.clone({ isSelected: false })
				}
				return obj
			}),
		)
	}
	const onEmptyClick = (position: THREE.Vector3) => {
		updateData([...data, new Box(0x00ff00, position)])
	}

	return (
		<ThreeBridge onClickObject={onClickObject} onEmptyClick={onEmptyClick}>
			{data.map(box => (
				<ThreeBox box={box} key={box.id} />
			))}
		</ThreeBridge>
	)
}

export default Scene
