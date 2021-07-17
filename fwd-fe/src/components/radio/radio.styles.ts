import makeStyles from '@material-ui/core/styles/makeStyles';

import { pxToRem } from 'helpers/common.helper';

const useStyles = makeStyles({
  radioHasLabel: {
    marginRight: '0px !important',
  },
  checked: { color: '#00ca92 !important' },
  icon: {
    width: 30,
    height: 30,
  },
  label: {
    color: '#414a59',
    fontSize: pxToRem(16),
    fontWeight: 500,
  },
  disabledLabel: {
    color: '#c8cacd',
  },
});

export default useStyles;
