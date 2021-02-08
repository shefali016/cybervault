import { getThemeProps } from '@material-ui/styles'
import ReactLoading from 'react-loading'

type Props = { color?: string; className?: string } & any

export const AppLoader = ({ color = '#fff', className, ...rest }: Props) => (
  <ReactLoading
    type={'bubbles'}
    color={color}
    className={className}
    {...rest}
  />
)
