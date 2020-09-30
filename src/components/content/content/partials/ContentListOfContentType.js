import React, {useContext, useEffect, useState} from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Paper} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

import {StyledSvg} from "assets/js/App";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import {ModalBody} from "assets/js/content/contentRegisterModal";
import {StyledCancelButton} from "assets/js/content/contentRegisterModal";

import {styles, listItemStyles} from "assets/js/content/contentType"
import ContentsContext from "contexts/ContentsContext";

const useStyles = makeStyles(styles);
const StyledListItem = withStyles(listItemStyles)(ListItem);

function ContentListOfContentType({setContentType, t, openRegisterForm, handleCloseRegisterForm}) {
    const lang = i18next.language;
    const classes = useStyles({lang: lang});
    const contentsContext = useContext(ContentsContext);
    const [contentTypeNameList, setContentTypeNameList] = useState([]);

    const handleToggle = (e, value) => {
        setContentType(value.machinName);
    }

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
        <Fade in={openRegisterForm} id="modalContentList">
            <Box>
                <StyledCancelButton onClick={handleCloseRegisterForm} className='exitButton'>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <Paper className={classes.paper}>
                        <List className={classes.root}>
                            <StyledListItem role={undefined} dense button>
                                <ListItemText id={0} primary={t('contents:chooseContentType')}/>
                            </StyledListItem>
                            {contentTypeNameList?.map((value) => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                    <StyledListItem key={value.name} role={undefined} dense button
                                                    onClick={(e) => handleToggle(e, value)}>
                                        <ListItemText id={labelId} primary={`${value.name}`}/>
                                    </StyledListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </ModalBody>
            </Box>
        </Fade>
    );
}

export default withNamespaces('contents')(ContentListOfContentType);