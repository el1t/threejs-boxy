import { Button } from '@mui/material'
import { useAppDispatch } from '../store/hooks'
import { deleteBox, useSelectedObject } from '../store/sceneSlice'

const DeleteButton: React.FC = () => {
	const dispatch = useAppDispatch()
	const selection = useSelectedObject()
	return (
		<Button
			color="error"
			onClick={() => {
				if (selection == null) {
					return
				}
				dispatch(deleteBox(selection.id))
			}}
			variant="outlined">
			Delete Box
		</Button>
	)
}

export default DeleteButton
