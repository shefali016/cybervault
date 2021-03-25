// Take array of clients, renders list of clients, returns client item component
import React, { useEffect, useState, useMemo } from 'react'
import { getAllClientsRequest } from '../../actions/clientActions'
import { Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'
import * as Types from '../../utils/Interface'
import clsx from 'clsx'
import { Client, Row } from 'utils/Interface'
import ClientItem from 'components/Clients/ClientItem'
import { EmptyIcon } from 'components/EmptyIcon'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

type Props = {
  clients: Array<Client>
  onClick: (client: Client) => void
  className?: string
}

export const ClientList = ({ clients, onClick, className }: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={className}>
      <div className={'listStyle'}>
        {clients.length == 0 && (
          <EmptyIcon Icon={AccountBoxIcon} title={'No clients found'} />
        )}
        {clients.map((client: Client) => (
          <ClientItem client={client} onClick={onClick} />
        ))}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  invoicingWrapper: {
    flexWrap: 'nowrap',
    overflowX: 'auto',
    whiteSpace: 'nowrap'
  },
  middleCardsWrapper: {
    display: FLEX,
    [theme.breakpoints.down('sm')]: {
      flexDirection: COLUMN
    }
  },
  sectionTitle: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.background
  },
  background: {
    backgroundColor: '#24262B',
    height: '100%',
    width: '100%',
    overflowY: 'auto'
  },
  widgetItem: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3)
    }
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1.5)
  },
  sectionTitleContainer: { flex: 1 },
  projectCardsUl: {
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    listStyle: 'none'
  },
  projectCardsli: {
    float: 'left',
    margin: '0 0 20px 0',
    width: '25%'
  },
  sectionInner: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    paddingTop: 0
  }
}))

export default ClientList
