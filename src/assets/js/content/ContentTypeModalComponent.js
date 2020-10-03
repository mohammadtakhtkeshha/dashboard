import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import clsx from "clsx";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {makeStyles} from "@material-ui/styles";
import {Box, Typography} from "@material-ui/core";
// import * as cancelIcon from './../../../../assets/svg/cancel-icon.svg';
import ContentListOfContentType from "./ContentListOfContentType";

import {useStyles} from "assets/js/content/partials/contentModal";
import {ModalBox, ModalAround} from "assets/js/content/partials/contentModal";
import contentService from "core/services/content.service";
import NewContentContext from "contexts/NewContentContext";
import AppContext from "contexts/AppContext";
import ContentsContext from "contexts/ContentsContext";
import {StyledFooterRegisterContent} from "assets/js/content/contentRegisterModal";
import Fade from "@material-ui/core/Fade";

import {StyledButton, StyledHead, StyledSvg} from "assets/js/App";
import {primary} from "components/partials/Colors";
import {ModalBody} from "assets/js/content/partials/contentModal";

import NewContent from "./../new/index"
import {ReactComponent as Exit} from "../../../../assets/svg/exit.svg";

const useStyle = makeStyles(useStyles);

function ContentTypeModalComponent({t, openRegisterForm, handleCloseContentForm}) {
    const lang = i18next.language;
    const classes = useStyle();
    const [contentType, setContentType] = useState('');

    const handleCloseRegisterForm = () => {
        handleCloseContentForm();
        setContentType('');
    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openRegisterForm}
                onClose={handleCloseRegisterForm}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openRegisterForm} id="modal">
                    <div>
                        <button onClick={handleCloseRegisterForm} className='exitButton'>
                            <StyledSvg>
                                <Exit width={"40px"} height={"40px"} />
                            </StyledSvg>
                        </button>
                        <ModalAround>
                            <ModalBox>
                                <ModalBody>
                                    <ContentListOfContentType setContentType={setContentType}/>
                                </ModalBody>
                            </ModalBox>
                        </ModalAround>
                    </div>
                </Fade>

            </Modal>

        </>);
}

export default withNamespaces('user,translation')(ContentTypeModalComponent);
