import {
  SvgIconTypeMap,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { EmptyIcon } from 'components/EmptyIcon'
import React from 'react'
import { Cell, Row } from 'utils/Interface'
import { AppLoader } from './AppLoader'

interface Props {
  headerCells: Array<Cell>
  rows: Array<Row>
  className?: string | undefined
  rest?: any
  handleRowClick: (row: any) => void
  emptyProps: {
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
    title: string
  }
  loading?: boolean
}

export const AppTable = ({
  headerCells,
  rows,
  className,
  emptyProps,
  handleRowClick,
  loading,
  ...rest
}: Props) => {
  const classes = useStyles()

  const renderCell = (
    { renderer, title, cellProps, key, style }: Cell,
    lastCell?: boolean
  ) => (
    <TableCell
      key={key}
      {...cellProps}
      className={clsx(classes.cellWrapper)}
      classes={{ root: lastCell ? classes.lastRow : classes.row }}
      style={style}>
      {typeof renderer === 'function' ? renderer() : title}
    </TableCell>
  )

  const renderHeaderCell = ({
    renderer,
    title,
    cellProps,
    key,
    style
  }: Cell) => (
    <TableCell
      key={key}
      {...cellProps}
      className={clsx(classes.cellWrapper)}
      classes={{ root: classes.headerCell }}
      style={style}>
      {typeof renderer === 'function' ? renderer() : title}
    </TableCell>
  )

  return (
    <div className={clsx('table', className)}>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headerCells.map((cell: Cell) => renderHeaderCell(cell))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row: Row, index) => (
              <TableRow
                key={`table-row-${row.key}`}
                onClick={() => handleRowClick(row.key)}>
                {row.row.map((cell: Cell) =>
                  renderCell(cell, index === rows.length - 1)
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {rows.length === 0 && !!emptyProps.Icon && (
        <div className={classes.emptyContainer}>
          {loading ? <AppLoader /> : <EmptyIcon {...emptyProps} />}
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  tableContainer: { background: theme.palette.background.surface },
  table: { position: 'relative', flex: 1 },
  emptyContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  cellWrapper: { color: theme.palette.text.background, cursor: 'pointer' },
  row: { borderColor: theme.palette.border },
  lastRow: { borderColor: 'transparent' },
  headerCell: { background: theme.palette.background.surfaceHighlight }
}))
