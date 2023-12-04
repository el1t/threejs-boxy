import { Box as MuiBox, TextField, Typography } from '@mui/material'
import Box from '../Box'
import Styles from '../Styles'

interface Props {
	readonly box: Box
}

const DetailList: React.FC<Props> = ({ box }) => {
	return (
		<MuiBox component="form" css={styles.container}>
			<SectionTitle text="Position" />
			<MuiBox css={styles.row}>
				<TextField
					label="X"
					type="number"
					value={formatNumber(box.position.x)}
				/>
				<TextField
					label="Y"
					type="number"
					value={formatNumber(box.position.y)}
				/>
				<TextField
					label="Z"
					type="number"
					value={formatNumber(box.position.z)}
				/>
			</MuiBox>
			<SectionTitle text="Dimensions" />
			<MuiBox css={styles.row}>
				<TextField
					label="Width"
					type="number"
					value={formatNumber(box.dimensions.x)}
				/>
				<TextField
					label="Height"
					type="number"
					value={formatNumber(box.dimensions.y)}
				/>
				<TextField
					label="Depth"
					type="number"
					value={formatNumber(box.dimensions.z)}
				/>
			</MuiBox>
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
