import { Paper, Typography } from '@mui/material'
import Box from '../Box'
import Styles from '../Styles'

interface Props {
	readonly className?: string
	readonly selection: Box | undefined
}

const Inspector: React.FC<Props> = ({ className, selection }) => {
	return (
		<Paper className={className} css={styles.container}>
			<Typography css={styles.title} variant="body1">
				Inspector
			</Typography>
			{selection == null ? (
				<Typography variant="body2">
					Click an existing object or click anywhere to create a new object
				</Typography>
			) : null}
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
		marginBottom: 12,
	},
})

export default Inspector
