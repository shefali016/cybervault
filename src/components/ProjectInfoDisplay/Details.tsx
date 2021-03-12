import React from 'react'
import { Typography } from '@material-ui/core'
import { ROW, FLEX } from 'utils/constants/stringConstants'
import { GREY_COLOR } from 'utils/constants/colorsConstants'

type Props = {
  label: string
  value?: string
  startDate?: string
  endDate?: string
}

export const Details = ({ label, value, startDate, endDate }: Props) => {
  return (
    <div style={{ display: FLEX, flexDirection: ROW, marginTop: 10 }}>
      <Typography variant={'body1'} style={{ minWidth: 250 }}>
        {label}
      </Typography>
      <Typography variant={'body1'}>
        {' '}
        {startDate ? `Start Date:  {startDate}` : value}
      </Typography>
      {endDate ? (
        <Typography style={{ marginLeft: 20 }} variant={'body1'}>
          {'End Date:  '} {endDate}
        </Typography>
      ) : null}
    </div>
  )
}

export const renderDevider = (props?: any) => {
  return (
    <div
      style={{
        height: 1,
        backgroundColor: GREY_COLOR,
        width: props && props.editInfo ? '90%' : '100%',
        marginTop: 20
      }}
    />
  )
}
