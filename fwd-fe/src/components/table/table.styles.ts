import MuiTableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';

import { pxToRem } from 'helpers/common.helper';
import { Color } from 'constants/style.const';

const useStyles = makeStyles({
  tableContainer: {
    flex: 1,
    overflowX: 'auto',
    overflowY: 'unset',
    // overflow: 'auto',
  },
  table: {
    minWidth: 850,
    tableLayout: 'fixed',
    overflowX: 'auto',
    height: '100%',
  },
  noDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: Color.LIGHT_GREY,
    lineHeight: '2rem',
    height: '400px',
    padding: '20px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: Color.LIGHT_GREY,
    lineHeight: '2rem',
    height: '400px',
    padding: '20px',
  },
});

export const TableHeadCell = withStyles(() => ({
  root: {
    verticalAlign: 'baseline',
    padding: '20px 25px',
    fontSize: pxToRem(16),
    fontWeight: 700,
    color: '#cccccc',
    borderTop: 'none',
    borderBottom: 'solid 1px #cccccc',
  },
}))(MuiTableCell);

export const TableCell = withStyles(() => ({
  root: {
    verticalAlign: 'middle',
    padding: '10px 25px',
    fontSize: pxToRem(16),
    color: '#414a59',
    borderTop: 'none',
    borderBottom: 'solid 1px #cccccc',
  },
}))(MuiTableCell);

export default useStyles;
