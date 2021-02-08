import {
  Icon,
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

interface Props {
  headerCells: Array<Cell>
  rows: Array<Row>
  tableContainerClassName: string | undefined
  rest?: any
  emptyProps: {
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
    title: string
  }
}

export const AppTable = ({
  headerCells,
  rows,
  tableContainerClassName,
  emptyProps,
  ...rest
}: Props) => {
  const classes = useStyles()

  const renderCell = ({ renderer, title, cellProps, key }: Cell) => (
    <TableCell {...cellProps} className={clsx(classes.cellWrapper)}>
      {typeof renderer === 'function' ? renderer() : title}
    </TableCell>
  )

  return (
    <TableContainer
      className={clsx(classes.tableContainer, tableContainerClassName)}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {headerCells.map((cell: Cell) => renderCell(cell))}
          </TableRow>
        </TableHead>

        {rows.length === 0 && !!Icon && (
          <div className={classes.emptyContainer}>
            <EmptyIcon {...emptyProps} />
          </div>
        )}

        <TableBody>
          {rows.map((row: Array<Cell>, index) => (
            <TableRow key={`table-row-${index}`}>
              {row.map((cell: Cell) => renderCell(cell))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const useStyles = makeStyles((theme) => ({
  tableContainer: { background: theme.palette.background.surface },
  table: { position: 'relative' },
  emptyContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    left: 0
  },
  cellWrapper: { color: '#fff' }
}))
