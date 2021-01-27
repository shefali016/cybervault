import { getThemeProps } from '@material-ui/styles'
import ReactLoading from 'react-loading'

type Props = { color?: string; className?: string }

export const AppLoader = ({ color = '#fff', className }: Props) => (
  <ReactLoading type={'bubbles'} color={color} className={className} />
)
