import React from 'react'
import { Typography } from '@material-ui/core'
import { ROW, FLEX } from 'utils/constants/stringConstants'
import { GREY_COLOR } from 'utils/constants/colorsConstants'

export const renderDetails = (
  leftLabel: string,
  rightValue: string,
  nextRightValue?: string
) => {
  return (
    <div style={{ display: FLEX, flexDirection: ROW, marginTop: 10 }}>
      <Typography variant={'body1'} style={{ minWidth: 250 }}>
        {leftLabel}
      </Typography>
      <Typography variant={'body1'}>
        {' '}
        {nextRightValue ? 'Start Date:  ' : ''}
        {rightValue}
      </Typography>
      {nextRightValue ? (
        <Typography style={{ marginLeft: 20 }} variant={'body1'}>
          {'End Date:  '} {nextRightValue}
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
