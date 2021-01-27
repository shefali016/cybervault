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

type Cell = {
  cellProps?: any
  renderer?: () => React.ReactElement
  title?: string
  key: string
}
type Row = Array<Cell>

interface Props {
  headerCells: Array<Cell>
  rows: Array<Row>
  tableContainerClassName: string
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
    <TableCell {...cellProps}>
      {typeof renderer === 'function' ? renderer() : title}
    </TableCell>
  )

  return (
    <TableContainer
      className={clsx(classes.tableContainer, tableContainerClassName)}>
      <Table>
        <TableHead>
          <TableRow>
            {headerCells.map((cell: Cell) => renderCell(cell))}
          </TableRow>
        </TableHead>
        <TableBody>
          <div className={classes.emptyContainer}>
            {rows.length === 0 && !!Icon && <EmptyIcon {...emptyProps} />}
          </div>
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
  emptyContainer: { display: 'flex', justifyContent: 'center' }
}))
