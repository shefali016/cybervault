import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { Portfolio, PortfolioCache, PortfolioFolder } from 'utils/Interface'
import { PortfolioList } from 'components/Portfolio/PortfolioList'
import { useStyles } from 'components/Portfolio/style'
import FolderIcon from '@material-ui/icons/Folder'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import { sortByCreatedAt } from 'utils'

type StateProps = {
  portfolioCache: PortfolioCache
  folder: PortfolioFolder
}

type Props = { location: any; match: any; history: any }

const PortfolioFolderScreen = ({
  history,
  folder,
  portfolioCache
}: Props & StateProps) => {
  const classes = useStyles()
  const theme = useTheme()

  const portfolios = useMemo(() => {
    const portfolios = folder.portfolios.map((id: string) => portfolioCache[id])
    return sortByCreatedAt(portfolios)
  }, [])

  const goToPortfolio = (portfolio: Portfolio) => {
    history.push(`/portfolio/${portfolio.id}`)
  }

  return (
    <div className='screenContainer'>
      <div
        className={clsx('screenInner')}
        style={{
          marginBottom: theme.spacing(2)
        }}>
        <div className={clsx('row', 'responsivePadding')}>
          <FolderIcon
            className={classes.uploadFolderIcon}
            style={{ marginRight: theme.spacing(2) }}
          />
          <div style={{ paddingTop: theme.spacing(1) }}>
            <Typography variant={'h5'} className='bold'>
              {folder.name}
            </Typography>
            {!!folder.description && (
              <Typography variant={'body1'}>{folder.description}</Typography>
            )}
          </div>
        </div>
      </div>
      <div className={'screenInner'}>
        <PortfolioList
          portfolios={portfolios}
          onClick={goToPortfolio}
          className='responsivePadding'
        />
      </div>
    </div>
  )
}

const mapState = (state: ReduxState, ownProps: Props): StateProps => {
  const folderId = ownProps.match.params?.id
  const folder = state.portfolio.folderCache[folderId]
  const portfolioCache = state.portfolio.portfolioCache

  return { portfolioCache, folder }
}

export default connect(mapState)(PortfolioFolderScreen)
