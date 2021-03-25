import React, { useMemo } from 'react'
import { AppTable } from 'components/Common/Core/AppTable'
import { Portfolio } from 'utils/Interface'
import { useStyles } from './style'
import { PortfolioItem } from 'components/Portfolio/PortfolioItem'
import { useTheme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import clsx from 'clsx'

type Props = {
  portfolios: Array<Portfolio>
  onClick: (portfolio: Portfolio) => void
  className?: string
}

export const PortfolioList = ({ portfolios, onClick, className }: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={className}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 0.5fr))',
          gap: theme.spacing(3)
        }}>
        {portfolios.map((portfolio: Portfolio) => (
          <PortfolioItem portfolio={portfolio} onClick={onClick} />
        ))}
      </div>
    </div>
  )
}
