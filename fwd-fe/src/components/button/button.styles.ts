import makeStyles from '@material-ui/core/styles/makeStyles';

import { pxToRem } from 'helpers/common.helper';

const useStyles = makeStyles({
  button: {
    minWidth: 'unset',
    height: 55,
    paddingLeft: 30,
    paddingRight: 30,
    boxShadow: 'none',
    fontSize: pxToRem(16),
    color: '#ffffff',
    textTransform: 'none',
    borderRadius: 7,
    '&:hover': {
      boxShadow: 'none',
    },
  },
  primaryContained: {
    backgroundColor: '#00ca92',
    '&:hover': {
      backgroundColor: '#19cf9c',
    },
  },
  secondaryContained: {
    backgroundColor: '#414a59',
    '&:hover': {
      backgroundColor: '#535b69',
    },
  },
  infoContained: {
    backgroundColor: '#2c97de',
    '&:hover': {
      backgroundColor: '#41a1e1',
    },
  },
  warningContained: {
    backgroundColor: '#ffc200',
    '&:hover': {
      backgroundColor: '#ffc819',
    },
  },
  dangerContained: {
    backgroundColor: '#de1118',
    '&:hover': {
      backgroundColor: '#ed1c23',
    },
  },
  greyContained: {
    backgroundColor: '#eaeae9',
    color: '#414a59',
    '&:hover': {
      backgroundColor: '#ececeb',
      color: '#535b69',
    },
  },
  primaryOutlined: {
    backgroundColor: 'transparent',
    borderColor: '#00ca92',
    color: '#00ca92',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#19cf9c',
      color: '#19cf9c',
    },
  },
  secondaryOutlined: {
    backgroundColor: 'transparent',
    borderColor: '#414a59',
    color: '#414a59',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#535b69',
      color: '#535b69',
    },
  },
  infoOutlined: {
    backgroundColor: 'transparent',
    borderColor: '#2c97de',
    color: '#2c97de',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#41a1e1',
      color: '#41a1e1',
    },
  },
  warningOutlined: {
    backgroundColor: 'transparent',
    borderColor: '#ffc200',
    color: '#ffc200',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#ffc819',
      color: '#ffc819',
    },
  },
  dangerOutlined: {
    backgroundColor: 'transparent',
    borderColor: '#de1118',
    color: '#de1118',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#ed1c23',
      color: '#ed1c23',
    },
  },
  greyOutlined: {
    backgroundColor: 'transparent',
    borderColor: '#eaeae9',
    color: '#eaeae9',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#ececeb',
      color: '#ececeb',
    },
  },
  primaryText: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '#00ca92',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'none',
      color: '#19cf9c',
    },
  },
  secondaryText: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '#414a59',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '#535b69',
    },
  },
  infoText: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '#2c97de',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '#41a1e1',
    },
  },
  warningText: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '#ffc200',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '#ffc819',
    },
  },
  dangerText: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '#de1118',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '#ed1c23',
    },
  },
  greyText: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '#eaeae9',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: '#ececeb',
    },
  },
  rounded: {
    borderRadius: 55,
  },
});

export default useStyles;
