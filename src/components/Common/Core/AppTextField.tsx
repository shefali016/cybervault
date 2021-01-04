import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import {
  BLACK_COLOR,
  GREY_COLOR,
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
}

const AppTextField = ({
  type,
  label,
  value,
  onChange,
  multiline,
  style = {}
}: Props) => {
  const classes = useStyles()
  return (
    <TextField
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
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    }
  },
  dateRootFilled: {
    color: GREY_COLOR,
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
      borderColor: GREY_COLOR,
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
    color: BLACK_COLOR
  },
  multilineInputRoot: {
    color: BLACK_COLOR
  },
  labelRoot: {
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    }
  },
  labelRootFilled: {
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    }
  }
}))

export default AppTextField
