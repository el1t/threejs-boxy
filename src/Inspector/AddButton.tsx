import { Button } from '@mui/material'
import { addBoxAndSelect, useSelectedObject } from '../store/sceneSlice'
import * as THREE from 'three'
import { useAppDispatch } from '../store/hooks'

const AddButton: React.FC = () => {
	const dispatch = useAppDispatch()
	const selection = useSelectedObject()
	return (
		<Button
			onClick={() => {
				if (selection == null) {
					return
				}
				dispatch(
					addBoxAndSelect({
						color: 0xff00ff,
						position: selection.position
							.clone()
							.add(new THREE.Vector3(0, selection.dimensions.y * 1.05, 0)),
					}),
				)
			}}
			variant="contained">
			Add Box Above
		</Button>
	)
}

export default AddButton
