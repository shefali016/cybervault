import { useTheme } from '@material-ui/core/styles'
import ReactLoading from 'react-loading'

type Props = { color?: string; className?: string } & any

export const AppLoader = ({ color, className, ...rest }: Props) => {
  const theme = useTheme()
  return (
    <ReactLoading
      type={'bubbles'}
      color={color || theme.palette.primary.main}
      className={className}
      {...rest}
    />
  )
}
