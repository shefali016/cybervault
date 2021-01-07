import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import {
  BLACK_COLOR,
  PRIMARY_COLOR,
  PRIMARY_DARK_COLOR
} from '../../../utils/constants/colorsConstants'
import { InputChangeEvent } from '../../../utils/types'

type Props = {
  type?: string
  label: string
  value: any
  onChange: (e: InputChangeEvent) => void
  multiline?: boolean
  style?: {}
  error?: boolean
}

const AppTextField = ({
  type,
  label,
  value,
  onChange,
  multiline,
  style = {},
  error
}: Props) => {
  const classes = useStyles()
  const currentDate = new Date().toISOString().slice(0, 10)
  return (
    <TextField
      error={error ? error : false}
      label={label}
      variant='outlined'
      size='small'
      type={type}
      className={classes.textField}
      onChange={onChange}
      multiline={multiline}
      value={value}
      InputProps={{
        classes: {
          root: multiline ? classes.multilineInputRoot : classes.inputRoot
        }
      }}
      inputProps={type === 'date' ? { min: currentDate } : {}}
      InputLabelProps={
        type === 'date'
          ? {
              shrink: true,
              classes: {
                root: !value ? classes.dateRoot : classes.dateRootFilled,
                focused: classes.labelFocused
              }
            }
          : {
              classes: {
                root: !value ? classes.labelRoot : classes.labelRootFilled,
                focused: classes.labelFocused
              }
            }
      }
      style={{ marginTop: 8, marginBottom: 8, ...style }}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  dateRoot: {
    color: theme.palette.grey[500],
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    }
  },
  dateRootFilled: {
    color: theme.palette.grey[500],
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    },
    marginTop: 0
  },
  labelFocused: {},
  textField: {
    width: '100%',
    paddingBottom: 0,
    fontWeight: 500,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      // borderColor: theme.palette.grey[500],
      borderRadius: 20
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR
    }
  },
  inputRoot: {
    color: theme.palette.grey[900]
  },
  multilineInputRoot: {
    color: theme.palette.grey[900]
  },
  labelRoot: {
    color: theme.palette.grey[500],
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    }
  },
  labelRootFilled: {
    color: theme.palette.grey[500],
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    }
  }
}))

export default AppTextField
