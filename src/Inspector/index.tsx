import { Paper, Typography } from '@mui/material'
import Styles from '../Styles'
import DetailList from './DetailList'
import { useSelectedObject } from '../store/sceneSlice'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'

interface Props {
	readonly className?: string
}

const Inspector: React.FC<Props> = ({ className }) => {
	const selection = useSelectedObject()
	return (
		<Paper className={className} css={styles.container}>
			<Typography css={styles.title} variant="h5">
				Inspector
			</Typography>
			{selection == null ? (
				<Typography variant="body2">
					Click an existing object or click anywhere to create a new object
				</Typography>
			) : (
				<>
					<DetailList box={selection} />
					<div css={styles.buttonRow}>
						<AddButton />
						<DeleteButton />
					</div>
				</>
			)}
		</Paper>
	)
}

const styles = Styles.create({
	buttonRow: {
		display: 'flex',
		gap: 12,
	},
	container: {
		padding: 24,
		height: '100%',
		width: '25vw',
	},
	title: {
		marginBottom: 24,
	},
})

export default Inspector
