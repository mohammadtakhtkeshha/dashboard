import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {primary} from "components/partials/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: '10px',
    right: '10px',
    textAlign: 'center',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000,
    background: 'radial-gradient(#e7e2e2, transparent)',
    opacity: .5,
    top: '0',
    bottom:' 0',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    '& svg':{
      color:primary
    }
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
