import makeStyles from '@material-ui/core/styles/makeStyles';

import { pxToRem } from 'helpers/common.helper';

const useStyles = makeStyles({
  input: {
    minHeight: 55,
    backgroundColor: 'transparent !important',
    border: 'solid 1px #babdbf',
    borderRadius: 7,
    '&:after': {
      display: 'none !important',
    },
    '&:before': {
      display: 'none !important',
    },
    color: '#414a59',
  },
  inputHasLabel: {
    padding: '24px 20px 10px !important',
  },
  inputHasNotLabel: {
    padding: '18px 20px !important',
  },
  inputHasPrefix: {
    paddingLeft: '0px !important',
  },
  inputHasSuffix: {
    paddingRight: '0px !important',
  },
  inputError: {
    borderRadius: 7,
    border: 'solid 1px #de1118 !important',
  },
  inputFocused: {
    borderRadius: 7,
    border: 'solid 1px #00ca92 !important',
  },
  inputDisabled: {
    borderRadius: 7,
    borderColor: '#c8cacd !important',
    opacity: 0.6,
  },
  labelInput: {
    paddingLeft: 10,
    color: '#babdbf',
    fontSize: pxToRem(16),
  },
  labelInputHasPrefix: {
    paddingLeft: 44,
  },
  labelInputError: {
    color: '#de1118 !important',
  },
  labelInputFocused: {
    color: '#00ca92 !important',
  },
  labelInputDisabled: {
    color: '#c8cacd !important',
    opacity: 0.6,
  },
  asterisk: {
    color: '#de1118',
  },
});

export default useStyles;
