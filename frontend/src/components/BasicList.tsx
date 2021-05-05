import { ReactNode, useCallback } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { capitalize, isNumber } from 'lodash'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow)

type BasicListProps<T extends AnyObject[], K> = {
  data: T | undefined
  columns: K
  renderActions?: (data: T[number]) => ReactNode
}
const BasicList = <T extends AnyObject[], K extends (keyof T[number])[]>(
  props: BasicListProps<T, K>,
) => {
  const { data, columns, renderActions } = props

  const renderRow = useCallback(
    (d: T[number], index: number) => {
      return (
        <StyledTableRow key={d.id}>
          <StyledTableCell align="left">{index + 1}</StyledTableCell>
          {columns.map((k) => {
            const colData = d[k]
            return (
              <StyledTableCell
                key={`${d.id}-${index}-${k}`}
                component="th"
                scope="row"
              >
                {isNumber(colData) || colData ? colData : '-'}
              </StyledTableCell>
            )
          })}
          {renderActions && (
            <StyledTableCell key={`action`} component="th" scope="row">
              {renderActions(d)}
            </StyledTableCell>
          )}
        </StyledTableRow>
      )
    },
    [columns, renderActions],
  )

  const renderHeaderColumns = useCallback((k, index) => {
    const key = k as string
    return (
      <StyledTableCell key={`${index}-${key}`} align="left">
        {capitalize(key)}
      </StyledTableCell>
    )
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={'40px'} align="center">
              #
            </StyledTableCell>
            {columns.map(renderHeaderColumns)}
            {renderActions && (
              <StyledTableCell
                key={`action`}
                className="actions"
              ></StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>{data && data.map(renderRow)}</TableBody>
      </Table>
    </TableContainer>
  )
}
export default BasicList
