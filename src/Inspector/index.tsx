import { Paper, Typography } from '@mui/material'
import Box from '../Box'
import Styles from '../Styles'
import DetailList from './DetailList'

interface Props {
	readonly className?: string
	readonly selection: Box | undefined
}

const Inspector: React.FC<Props> = ({ className, selection }) => {
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
				<DetailList box={selection} />
			)}
		</Paper>
	)
}

const styles = Styles.create({
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
