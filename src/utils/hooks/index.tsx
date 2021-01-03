import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

export const useTabletLayout = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('sm'))
}
