import React, {useContext, useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {Paper} from "@material-ui/core";

import {styles} from "assets/js/content/contentType"
import ContentsContext from "contexts/ContentsContext";

const useStyles = makeStyles(styles);

export default function ContentListOfContentType({setContentType}) {
    const classes = useStyles();
    const [checked, setChecked] = useState([0]);
    const contentsContext = useContext(ContentsContext);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        setContentType(value.name);
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    return (
        <Paper className={classes.paper}>
            <List className={classes.root}>
                {contentsContext.contentTypeList?.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                        <ListItem key={value.name} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.name}`}/>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}