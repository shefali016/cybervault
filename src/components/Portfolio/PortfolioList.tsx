import React from 'react'
import { Portfolio } from 'utils/Interface'
import { useStyles } from './style'
import { PortfolioItem } from 'components/Portfolio/PortfolioItem'
import { useTheme } from '@material-ui/core/styles'

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: theme.spacing(3)
        }}>
        {portfolios.map((portfolio: Portfolio) => (
          <PortfolioItem portfolio={portfolio} onClick={onClick} />
        ))}
      </div>
    </div>
  )
}
