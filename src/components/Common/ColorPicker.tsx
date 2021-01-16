import { Typography, Button, Fade } from '@material-ui/core'
import React, { useState } from 'react'
import { BlockPicker } from 'react-color'
import { makeStyles } from '@material-ui/core/styles'
import classes from '*.module.css'
import clsx from 'clsx'

type Props = {
  onChange: (color: string) => void
  color: string | undefined
  label?: string
  className?: string
}

export const ColorPicker = ({
  onChange,
  color = '#e6e6e6',
  label,
  className
}: Props) => {
  const classes = useStyles()
  const [pickerOpen, setPickerOpen] = useState(false)
  return (
    <div className={clsx(classes.container, className)}>
      <div>
        <Typography variant={'subtitle1'} className={classes.label}>
          {label}
        </Typography>
        <Button
          className={classes.colorDisplayOuter}
          onClick={() => setPickerOpen(!pickerOpen)}>
          <div className={classes.colorDisplay}>
            <Typography className={classes.colorText}>{color}</Typography>
            <div
              className={classes.color}
              style={{ backgroundColor: color }}></div>
          </div>
        </Button>
      </div>

      <Fade in={pickerOpen}>
        <div className={classes.pickerWrapper}>
          <BlockPicker
            color={color}
            onChange={(color: any) => onChange(color.hex)}
          />
        </div>
      </Fade>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: { position: 'relative' },
  pickerWrapper: {
    display: 'block',
    boxShadow: '0 0 10px #999999',
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    zIndex: 100
  },
  colorDisplayOuter: { display: 'flex', marginBottom: 10, padding: 0 },
  colorDisplay: {
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.border,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 1,
    minWidth: 150
  },
  color: {
    borderRadius: theme.shape.borderRadius,
    height: theme.spacing(5),
    width: theme.spacing(5),
    marginLeft: theme.spacing(2),
    boxShadow: '0 0 2px #999999'
  },
  colorText: { fontWeight: 'bold' },
  label: { color: theme.palette.text.paper }
}))
