import Alert from '@material-ui/lab/Alert'
import React, { createContext, useState } from 'react'

export const ToastContext = createContext({
  showToast: ({
    title,
    duration,
    type
  }: {
    title: string
    duration?: number
    type?: string
  }) => {}
})

export const ToastTypes = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success'
}

type Toast = { title: string; type: string }

export const ToastProvider = ({
  children
}: {
  children: React.ReactElement
}) => {
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = ({
    title = '',
    type = ToastTypes.error,
    duration = 5000
  }) => {
    setToast({ title, type })
    setTimeout(() => setToast(null), duration)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div>
        {children}
        {!!toast && (
          <div
            style={{
              position: 'fixed',
              top: 20,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 30,
              pointerEvents: 'none'
            }}>
            <Alert
              severity={toast.type as any}
              variant='filled'
              style={{ zIndex: 30000 }}>
              {toast.title}
            </Alert>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}
