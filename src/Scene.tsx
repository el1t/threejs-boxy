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
		updateData([
			...data,
			new Box(
				0xff00ff,
				object.position
					.clone()
					.add(object.up.clone().normalize().multiplyScalar(1.1)),
			),
		])
	}
	const onEmptyClick = (position: THREE.Vector3) => {
		updateData([...data, new Box(0x00ff00, position)])
	}

	return (
		<ThreeBridge onClickObject={onClickObject} onEmptyClick={onEmptyClick}>
			{data.map(box => (
				<ThreeBox
					color={box.color}
					dimensions={box.dimensions}
					key={box.id}
					position={box.position}
				/>
			))}
		</ThreeBridge>
	)
}

export default Scene
