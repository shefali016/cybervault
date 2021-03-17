import React from 'react'
import { SubscriptionDuration } from 'utils/Interface'
import { SubscriptionDurations } from 'utils/enums'
import { useTheme } from '@material-ui/core/styles'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { Typography } from '@material-ui/core'

type Props = {
  value: SubscriptionDuration
  onChange: (duration: SubscriptionDuration) => void
  className?: string
  classes?: {}
}

export const SubscriptionDurationSwitch = ({
  value,
  onChange,
  className = '',
  classes
}: Props) => {
  const theme = useTheme()

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(event: any, duration: SubscriptionDuration) => {
        if (duration !== null) {
          onChange(duration)
        }
      }}
      style={{ marginBottom: theme.spacing(3) }}
      className={className}
      classes={classes}>
      <ToggleButton value={SubscriptionDurations.MONTHLY}>
        <Typography variant='inherit'>Monthly</Typography>
      </ToggleButton>
      <ToggleButton value={SubscriptionDurations.YEARLY}>
        <Typography variant='inherit'>Annualy</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
