import { makeStyles, TextField } from '@material-ui/core'
import React, { ChangeEvent } from 'react'
import {
  GREY_COLOR,
  PRIMARY_COLOR,
  PRIMARY_DARK_COLOR,
} from '../../../utils/constants/colorsConstants'

type Props = {
  type: string
  label: string
  value: any
  onChange: (e: ChangeEvent) => void
  multiline?: boolean
  style?: {}
}

const AppTextField = ({
  type,
  label,
  value,
  onChange,
  multiline,
  style = {},
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
          root: multiline ? classes.multilineInputRoot : classes.inputRoot,
        },
      }}
      InputLabelProps={
        type === 'date'
          ? {
              shrink: true,
              classes: {
                root: !value ? classes.dateRoot : classes.dateRootFilled,
                focused: classes.labelFocused,
              },
            }
          : {
              classes: {
                root: !value ? classes.labelRoot : classes.labelRootFilled,
                focused: classes.labelFocused,
              },
            }
      }
      style={{ marginTop: 8, marginBottom: 8, ...style }}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  dateRoot: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
    },
    height: 31,
  },
  dateRootFilled: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
    },
    height: 31,
    marginTop: 0,
  },
  labelFocused: {},
  textField: {
    width: '100%',
    paddingBottom: 0,
    fontWeight: 500,
    fontSize: 8,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: GREY_COLOR,
      borderRadius: 20,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR,
    },
  },
  inputRoot: {
    fontSize: 12,
    height: 35,
  },
  multilineInputRoot: {
    fontSize: 12,
  },
  labelRoot: {
    fontSize: 12,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
    },
  },
  labelRootFilled: {
    marginTop: -1,
    fontSize: 12,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
    },
  },
}))

export default AppTextField
