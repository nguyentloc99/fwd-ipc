import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  switchContainer: {
    position: 'relative',
  },
  root: {
    width: 60,
    height: 30,
    padding: 0,
  },
  switchBase: {
    padding: 2.5,
    '&$checked': {
      transform: 'translateX(30px)',
      color: '#ffffff',
      '& + $track': {
        backgroundColor: '#00ca92',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#00ca92',
      border: '6px solid #ffffff',
    },
  },
  thumb: {
    width: 25,
    height: 25,
    margin: 0,
  },
  track: {
    borderRadius: 20,
    border: `1px solid #babdbf`,
    backgroundColor: '#babdbf',
    opacity: 1,
    transition: 'background border 0.3s ease-in-out',
  },
  checked: {},
  focusVisible: {},
});

export default useStyles;
