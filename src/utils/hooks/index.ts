import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import React, { useRef, useEffect, useMemo, useState, RefObject } from 'react'
import { Client, Project } from 'utils/Interface'

export const useTabletLayout = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('sm'))
}

export const useOnChange = <T>(
  value: T,
  onChange: (value: T, prevValue: T) => void
) => {
  const previous = useRef<T>(value)
  useEffect(() => {
    if (previous.current !== value) {
      onChange(value, previous.current)
    }
    previous.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
}

export const useGetClient = (clients: Array<Client>, project: Project) =>
  useMemo(() => {
    return clients && project
      ? clients.find((client) => client.id === project.clientId)
      : undefined
  }, [clients, project])

export const useModalState = (
  initialOpen: boolean
): [boolean, (open: boolean) => void, (open: boolean) => () => void] => {
  const [open, setOpen] = useState(initialOpen)
  const toggle = (open: boolean) => () => setOpen(open)
  return [open, setOpen, toggle]
}

export const useClickedOutside = (ref: any, onClickOutside?: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        typeof onClickOutside === 'function' && onClickOutside()
      }
    }

    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref, onClickOutside])
}
