import { makeStyles, TextField, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import React, { useMemo, forwardRef } from 'react'
import { InputChangeEvent } from '../../../utils/Interface'

type Props = {
  type?: string
  label?: string
  name?: string
  value: any
  onChange: (e: InputChangeEvent) => void
  multiline?: boolean
  style?: {}
  error?: boolean
  darkStyle?: boolean
  disabled?: boolean
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onInput?: (e: InputChangeEvent) => void
  className?: string
  labelClassName?: string
  labelFocusedClassName?: string
}

const AppTextField = (
  {
    type,
    label,
    value,
    onChange,
    multiline,
    style = {},
    error,
    darkStyle,
    onKeyDown,
    onKeyUp,
    name,
    disabled,
    onInput,
    className = '',
    labelClassName = '',
    labelFocusedClassName = ''
  }: Props,
  ref: any
) => {
  const classes = useStyles()
  const theme = useTheme()
  const currentDate = new Date().toISOString().slice(0, 10)

  const dynamicInputStyle = useMemo(() => {
    if (multiline) {
      return darkStyle
        ? classes.multilineInputRootDark
        : classes.multilineInputRoot
    } else {
      return darkStyle ? classes.inputRootDark : classes.inputRoot
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiline, darkStyle])

  return (
    <TextField
      inputRef={ref}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onInput={onInput}
      error={error ? error : false}
      label={label}
      variant='outlined'
      size='small'
      type={type}
      className={error ? classes.errorTextField : classes.textField}
      onChange={onChange}
      multiline={multiline}
      value={value}
      name={name}
      disabled={disabled ? disabled : false}
      InputProps={{
        classes: {
          root: clsx(dynamicInputStyle, className)
        }
      }}
      inputProps={type === 'date' ? { min: currentDate } : {}}
      InputLabelProps={
        type === 'date'
          ? {
              shrink: true,
              classes: {
                root: clsx(
                  !value
                    ? darkStyle
                      ? classes.dateRootDark
                      : classes.dateRoot
                    : darkStyle
                    ? classes.dateRootDarkFilled
                    : classes.dateRootFilled,
                  labelClassName
                ),
                focused: clsx(classes.labelFocused, labelFocusedClassName)
              }
            }
          : {
              classes: {
                root: clsx(
                  !value ? classes.labelRoot : classes.labelRootFilled,
                  labelClassName
                ),
                focused: clsx(classes.labelFocused, labelFocusedClassName)
              }
            }
      }
      style={{
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        ...style
      }}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  dateRoot: {
    color: theme.palette.grey[500],
    '&$labelFocused': {
      color: theme.palette.primary.light
    }
  },
  dateRootFilled: {
    color: theme.palette.grey[500],
    '&$labelFocused': {
      color: theme.palette.primary.light
    },
    marginTop: 0
  },
  dateRootDark: {
    color: theme.palette.common.white,
    '&$labelFocused': {
      color: theme.palette.common.white
    }
  },
  dateRootDarkFilled: {
    color: theme.palette.common.white,
    '&$labelFocused': {
      color: theme.palette.common.white
    },
    marginTop: 0
  },
  labelFocused: {},
  errorTextField: {
    width: '100%',
    paddingBottom: 0,
    fontWeight: 500,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light
    }
  },
  textField: {
    width: '100%',
    paddingBottom: 0,
    fontWeight: 500,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[500]
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light
    }
  },
  inputRoot: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    color: theme.palette.grey[900],
    alignItems: 'center',
    justifyContent: 'center'
  },
  multilineInputRoot: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    color: theme.palette.grey[900]
  },
  inputRootDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    color: theme.palette.text.background
  },
  multilineInputRootDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    color: theme.palette.text.background
  },
  labelRoot: {
    color: theme.palette.grey[500],
    '&$labelFocused': {
      color: theme.palette.primary.light
    }
  },
  labelRootFilled: {
    color: theme.palette.grey[500],
    '&$labelFocused': {
      color: theme.palette.primary.light
    }
  }
}))

export default forwardRef(AppTextField)
