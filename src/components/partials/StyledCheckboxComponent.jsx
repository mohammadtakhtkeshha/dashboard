import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import {styledCheckbox} from "assets/js/partials/styledCheckbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(styledCheckbox);

 function StyledCheckboxComponent(props) {
    const classes = useStyles();

    return (
     <FormControlLabel
         control={
             <Checkbox
                 className={classes.root}
                 icon={<span className={classes.icon} />}
                 checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                 name="checkedI"
                 color="default"
                 value={props.value}
                 checked={props.checked}
                 onChange={props.change}
             />
         }
         label={props.label}
     />
    );
}

export default StyledCheckboxComponent;
