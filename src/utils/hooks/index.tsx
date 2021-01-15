import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useRef, useEffect } from 'react'

export const useTabletLayout = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('sm'))
}

export const useOnChange = (value: any, onChange: (value: any) => void) => {
  const previous = useRef(value)
  useEffect(() => {
    if (previous.current !== value) {
      onChange(value)
    }
    previous.current = value
  }, [value])
}
