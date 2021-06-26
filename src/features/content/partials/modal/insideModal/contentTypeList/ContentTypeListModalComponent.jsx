import React, {useContext} from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Box, List, ListItem, ListItemText, Fade, withStyles} from "@material-ui/core";

import {ReactComponent as Exit} from "assets/svg/exit.svg";
import {StyledCancelButton, ModalBody} from "assets/js/library/components/modal"
import {StyledSvg} from "assets/js/library/base/all"

import {
    listModalStyles,
    listItemModalStyles,
    styledListItemModalText,
    StyledModalHeader
} from "assets/js/library/pages/modalList"
import AuthorizedContext from "contexts/AuthorizedContext";
import ContentsContext from "contexts/ContentsContext";
import {get} from "libraries/local-storage";


const StyledListItemModalText = withStyles(styledListItemModalText)(ListItemText);
const StyledListModalItem = withStyles(listItemModalStyles)(ListItem);
const StyledModalList = withStyles(listModalStyles)(List);

function ContentTypeListModalComponent({t, openRegisterForm, handleCloseRegisterForm}) {
    const lang = i18next.language;
    const authorizedContext = useContext(AuthorizedContext);
    const contentsContext = useContext(ContentsContext);
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER));

    const handleToggle = (e, value) => {
        contentsContext.setContentType(value.machin_name);
    }

    return (<Fade in={openRegisterForm} id="modal">
            <Box>
                <StyledCancelButton onClick={handleCloseRegisterForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <StyledModalHeader role={undefined} dense button>
                        {t('contents:chooseContentType')}
                    </StyledModalHeader>
                    <StyledModalList
                        lang={lang}>
                        {authorizedContext.contentTypeNameList.map((value) => {
                            const labelId = `checkbox-list-label-${value}`;
                            return (<StyledListModalItem
                                permission={`${permissions[`create ${value.machin_name} content`].access}`}
                                key={value.machin_name} role={undefined} dense button
                                onClick={(e) => handleToggle(e, value)}>
                                {value.icon}
                                <StyledListItemModalText
                                    lang={lang}
                                    id={labelId}
                                    primary={lang === 'en' ? value.machin_name : value.name}
                                    secondary={value.description}
                                />
                            </StyledListModalItem>);
                        })}
                    </StyledModalList>
                </ModalBody>
            </Box>
        </Fade>
    );
}

export default withNamespaces('contents')(ContentTypeListModalComponent);
