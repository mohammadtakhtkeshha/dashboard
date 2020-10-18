import React, {useContext, useEffect, useState} from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {withStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fade from "@material-ui/core/Fade";

import {StyledSvg, StyledDirection} from "assets/js/App";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import {ModalBody, StyledCancelButton} from "assets/js/content/partials/contentModal";
import {listStyles, listItemStyles ,styledListItemText} from "assets/js/content/partials/contentType"
import ContentsContext from "contexts/ContentsContext";


const StyledListItemText = withStyles(styledListItemText)(ListItemText);
const StyledListItem = withStyles(listItemStyles)(ListItem);
const StyledList = withStyles(listStyles)(List);

function ContentTypeListModalComponent({setContentType, t, openRegisterForm, handleCloseRegisterForm}) {
    const lang = i18next.language;
    const contentsContext = useContext(ContentsContext);


    const handleToggle = (e, value) => {
        setContentType(value.machin_name);
    }

    // useEffect(() => {
    //     const currentContentTypeList = contentsContext.contentTypeList;
    //     let contentTypeArray = [];
    //     for (const [key, value] of Object.entries(currentContentTypeList)) {
    //         let obj = {machinName: key, name: value[0].name}
    //         contentTypeArray.push(obj);
    //     }
    //     setContentTypeNameList(contentTypeArray);
    // }, [contentsContext.contentTypeList]);
console.log(contentsContext.contentTypeNameList);
    return (
        <Fade in={openRegisterForm} id="modalContentList">
            <Box>
                <StyledCancelButton onClick={handleCloseRegisterForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <StyledDirection lang={lang}>
                        <StyledList lang={lang}>
                            <StyledListItem role={undefined} dense button>
                                <ListItemText id={0} primary={t('contents:chooseContentType')}/>
                            </StyledListItem>
                            {contentsContext.contentTypeNameList.map((value) => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                    <StyledListItem key={value.machin_name} role={undefined} dense button
                                                    onClick={(e) => handleToggle(e, value)}>
                                        {value.icon}
                                        <StyledListItemText lang={lang} id={labelId}
                                                      primary={lang === 'en' ? value.machin_name : value.name}
                                                      secondary={value.description}/>
                                    </StyledListItem>
                                );
                            })}
                        </StyledList>
                    </StyledDirection>
                </ModalBody>
            </Box>
        </Fade>
    );
}

export default withNamespaces('contents')(ContentTypeListModalComponent);
