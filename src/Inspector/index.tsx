import { Paper, Typography } from '@mui/material'
import Styles from '../Styles'

interface Props {
	readonly className?: string
}

const Inspector: React.FC<Props> = ({ className }) => {
	return (
		<Paper className={className} css={styles.container}>
			<Typography css={styles.title} variant="body1">
				Inspector
			</Typography>
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
