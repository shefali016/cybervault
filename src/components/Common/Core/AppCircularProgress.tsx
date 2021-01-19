import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export const AppCircularProgress = (props: any) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setValue(props.value), 200)
    return () => clearTimeout(timeout)
  }, [props.value])

  return (
    <CircularProgress
      variant='determinate'
      color='primary'
      size={props.size || 200}
      {...props}
      value={value}
    />
  )
}
