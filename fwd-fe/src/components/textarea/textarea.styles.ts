import makeStyles from '@material-ui/core/styles/makeStyles';

import { pxToRem } from 'helpers/common.helper';

const useStyles = makeStyles({
  textarea: {
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
  textareaHasLabel: {
    padding: '24px 20px 10px !important',
  },
  textareaHasNotLabel: {
    padding: '17px 20px !important',
  },
  textareaHasPrefix: {
    paddingLeft: '0px !important',
  },
  textareaHasSuffix: {
    paddingRight: '0px !important',
  },
  textareaError: {
    borderRadius: 7,
    border: 'solid 1px #de1118 !important',
  },
  textareaFocused: {
    borderRadius: 7,
    border: 'solid 1px #00ca92 !important',
  },
  textareaDisabled: {
    borderRadius: 7,
    borderColor: '#c8cacd !important',
    opacity: 0.6,
  },
  labelTextarea: {
    paddingLeft: 10,
    color: '#babdbf',
    fontSize: pxToRem(16),
  },
  labelTextareaHasPrefix: {
    paddingLeft: 46,
  },
  labelTextareaError: {
    color: '#de1118 !important',
  },
  labelTextareaFocused: {
    color: '#00ca92 !important',
  },
  labelTextareaDisabled: {
    color: '#c8cacd !important',
    opacity: 0.6,
  },
  asterisk: {
    color: '#de1118',
  },
});

export default useStyles;
