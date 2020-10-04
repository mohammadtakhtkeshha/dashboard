import React, {useContext, useEffect, useState} from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {withStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fade from "@material-ui/core/Fade";

import {StyledSvg} from "assets/js/App";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import {ModalBody, StyledCancelButton} from "assets/js/content/partials/contentModal";
import {styles, listItemStyles} from "assets/js/content/partials/contentType"
import ContentsContext from "contexts/ContentsContext";

const StyledListItem = withStyles(listItemStyles)(ListItem);
const StyledList = withStyles(styles)(List);

function ContentTypeListModalComponent({setContentType, t, openRegisterForm, handleCloseRegisterForm}) {
    const lang = i18next.language;
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
                <StyledCancelButton onClick={handleCloseRegisterForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <StyledList lang={lang}>
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
                    </StyledList>
                </ModalBody>
            </Box>
        </Fade>
    );
}

export default withNamespaces('contents')(ContentTypeListModalComponent);