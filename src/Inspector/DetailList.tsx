import { FormLabel, Box as MuiBox, TextField, Typography } from '@mui/material'
import type { Box } from '../store/Box'
import Styles from '../Styles'
import { updateSelectedBox } from '../store/sceneSlice'
import { useAppDispatch } from '../store/hooks'

interface Props {
	readonly box: Box
}

const DetailList: React.FC<Props> = ({ box }) => {
	const dispatch = useAppDispatch()
	const dispatchBoxUpdate = (config: Parameters<typeof updateSelectedBox>[0]) =>
		dispatch(updateSelectedBox(config))

	return (
		<MuiBox component="form" css={styles.container}>
			<SectionTitle text="Position" />
			<MuiBox css={styles.row}>
				<TextField
					label="X"
					onChange={event =>
						dispatchBoxUpdate({
							position: box.position.clone().setX(Number(event.target.value)),
						})
					}
					type="number"
					value={formatNumber(box.position.x)}
				/>
				<TextField
					label="Y"
					onChange={event =>
						dispatchBoxUpdate({
							position: box.position.clone().setY(Number(event.target.value)),
						})
					}
					type="number"
					value={formatNumber(box.position.y)}
				/>
				<TextField
					label="Z"
					onChange={event =>
						dispatchBoxUpdate({
							position: box.position.clone().setZ(Number(event.target.value)),
						})
					}
					type="number"
					value={formatNumber(box.position.z)}
				/>
			</MuiBox>
			<SectionTitle text="Dimensions" />
			<MuiBox css={styles.row}>
				<TextField
					label="Width"
					onChange={event =>
						dispatchBoxUpdate({
							dimensions: box.dimensions
								.clone()
								.setX(Number(event.target.value)),
						})
					}
					type="number"
					value={formatNumber(box.dimensions.x)}
				/>
				<TextField
					label="Height"
					onChange={event =>
						dispatchBoxUpdate({
							dimensions: box.dimensions
								.clone()
								.setY(Number(event.target.value)),
						})
					}
					type="number"
					value={formatNumber(box.dimensions.y)}
				/>
				<TextField
					label="Depth"
					onChange={event =>
						dispatchBoxUpdate({
							dimensions: box.dimensions
								.clone()
								.setZ(Number(event.target.value)),
						})
					}
					type="number"
					value={formatNumber(box.dimensions.z)}
				/>
			</MuiBox>
			<FormLabel title="Color">
				<input
					css={styles.row}
					name="Color"
					onChange={event =>
						dispatchBoxUpdate({
							color: parseInt(event.target.value.substring(1), 16),
						})
					}
					type="color"
					value={`#${box.color.toString(16).padStart(6, '0')}`}
				/>
			</FormLabel>
		</MuiBox>
	)
}

const SectionTitle: React.FC<{ readonly text: string }> = ({ text }) => (
	<Typography css={styles.row} variant="body1">
		{text}
	</Typography>
)

const formatNumber = (num: number) => +num.toFixed(4)

const styles = Styles.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		gap: 12,
		marginBottom: 24,
	},
})

export default DetailList
