// Take array of clients, renders list of clients, returns client item component
import React, { useEffect, useState, useMemo } from 'react'
import { getAllClientsRequest } from '../../actions/clientActions'
import { Card, Typography } from '@material-ui/core'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'
import * as Types from '../../utils/Interface'
import clsx from 'clsx'
import { Client, Row } from 'utils/Interface'
import { useStyles } from 'components/Portfolio/style'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { useTheme } from '@material-ui/core/styles'
import { EditButton } from 'components/Common/Button/EditButton'

type Props = {
  client: Client
  onClick: (client: Client) => void
  responsiveWidth?: boolean
  style?: {}
}

export const ClientItem = ({
  client,
  onClick,
  responsiveWidth = true,
  style
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Card
      key={client.id}
      onClick={() => onClick(client)}
      className={clsx(classes.portfoliosCard)}
      style={style}>
      <div className={classes.cardLogo}>
        {!!client.logo && <img src={client.logo} alt='' />}
      </div>

      <div className={classes.logoContent}>
        <Typography variant='body1' style={{ fontSize: 18 }}>
          {client.name}
        </Typography>
        <Typography
          variant='caption'
          style={{ margin: 0, marginTop: 0, padding: 0 }}>
          {client.email}
        </Typography>
      </div>

      <EditButton></EditButton>
    </Card>
  )
}

// const useStyles = makeStyles((theme) => ({
//   invoicingWrapper: {
//     flexWrap: 'nowrap',
//     overflowX: 'auto',
//     whiteSpace: 'nowrap'
//   },
//   middleCardsWrapper: {
//     display: FLEX,
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: COLUMN
//     }
//   },
//   sectionTitle: {
//     marginBottom: theme.spacing(1),
//     color: theme.palette.text.background
//   },
//   background: {
//     backgroundColor: '#24262B',
//     height: '100%',
//     width: '100%',
//     overflowY: 'auto'
//   },
//   widgetItem: {
//     [theme.breakpoints.up('sm')]: {
//       marginRight: theme.spacing(3)
//     },
//     [theme.breakpoints.down('sm')]: {
//       marginBottom: theme.spacing(3)
//     }
//   },
//   sectionHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     paddingLeft: theme.spacing(1.5)
//   },
//   sectionTitleContainer: { flex: 1 },
//   projectCardsUl: {
//     margin: 0,
//     padding: 0,
//     overflow: 'hidden',
//     listStyle: 'none'
//   },
//   projectCardsli: {
//     float: 'left',
//     margin: '0 0 20px 0',
//     width: '25%'
//   },
//   sectionInner: {
//     display: 'flex',
//     flexDirection: 'column',
//     flex: 1,
//     alignSelf: 'stretch'
//   },
//   section: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: theme.spacing(4),
//     marginTop: theme.spacing(4),
//     padding: theme.spacing(2),
//     paddingTop: 0
//   }
// }))

export default ClientItem
