import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useRef, useEffect, useMemo, useState } from 'react'
import { Client, Project } from 'utils/Interface'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
}

export const useGetClient = (clients: Array<Client>, project: Project) =>
  useMemo(
    () =>
      clients && project
        ? clients.find((client) => client.id === project.clientId)
        : undefined,
    [clients, project?.clientId]
  )

export const useModalState = (
  initialOpen: boolean
): [boolean, (open: boolean) => void, (open: boolean) => () => void] => {
  const [open, setOpen] = useState(initialOpen)
  const toggle = (open: boolean) => () => setOpen(open)
  return [open, setOpen, toggle]
}
