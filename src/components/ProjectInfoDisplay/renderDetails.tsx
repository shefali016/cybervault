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
    <div style={{ display: FLEX, flexDirection: ROW }}>
      <Typography variant={'caption'} style={{ minWidth: 150 }}>
        {leftLabel}
      </Typography>
      <Typography variant={'caption'}>
        {' '}
        {nextRightValue ? 'Start Date:  ' : ''}
        {rightValue}
      </Typography>
      {nextRightValue ? (
        <Typography style={{ marginLeft: 20 }} variant={'caption'}>
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
