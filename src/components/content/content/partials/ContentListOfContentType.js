import React, {useContext, useEffect, useState} from 'react';
import {withNamespaces} from "react-i18next";

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Paper} from "@material-ui/core";

import {styles} from "assets/js/content/contentType"
import ContentsContext from "contexts/ContentsContext";
import i18next from "i18next";

const useStyles = makeStyles(styles);

function ContentListOfContentType({setContentType}) {
    let align=i18next.language === 'fa' ? 'right':'left';
    const classes = useStyles({textAlign:align});
    const contentsContext = useContext(ContentsContext);
    const [contentTypeNameList, setContentTypeNameList] = useState([]);

    const handleToggle = (e, value) => {
        setContentType(value.machinName);
    };

    useEffect(() => {
        const currentContentTypeList = contentsContext.contentTypeList;
        let contentTypeArray = [];
        for (const [key, value] of Object.entries(currentContentTypeList)) {
            let obj = {machinName: key, name: value[0].name}
            contentTypeArray.push(obj);
        }
        setContentTypeNameList(contentTypeArray);
    }, [contentsContext.contentTypeList]);

    return (
        <Paper className={classes.paper}>
            <List className={classes.root}>
                <ListItem role={undefined} dense button>
                    <ListItemText id={0} primary="negar"/>
                </ListItem>
                {contentTypeNameList?.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                        <ListItem key={value.name} role={undefined} dense button
                                  onClick={(e) => handleToggle(e, value)}>
                            <ListItemText id={labelId} primary={`${value.name}`}/>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

export default withNamespaces('contents')(ContentListOfContentType);