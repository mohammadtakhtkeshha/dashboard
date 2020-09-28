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

import {useStyles} from "assets/js/content/contentRegisterModal";
import {ModalBox, ModalAround} from "assets/js/content/contentRegisterModal";
import contentService from "core/services/content.service";
import NewContentContext from "contexts/NewContentContext";
import AppContext from "contexts/AppContext";
import ContentsContext from "contexts/ContentsContext";
import {StyledFooterRegisterContent} from "assets/js/content/contentRegisterModal";
import {StyledButton} from "assets/js/App";
import {primary} from "components/partials/Colors";
import {ModalBody} from "assets/js/content/contentRegisterModal";

import NewContent from "./../newContent/index"

const useStyle = makeStyles(useStyles);

function ContentRegisterModalComponent({t, openRegisterForm, handleCloseContentForm}) {
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
                        <button onClick={handleCloseRegisterForm} className='button'>
                            <img src="../../../../assets/svg/cancel-icon.svg" alt="dsafsadf"/>
                        </button>
                    {/*<div className={classes.paper} dir="rtl">*/}
                    {/*    <Box className={clsx('header', (lang === 'en' ? 'flexDirL' : 'flexDirR'))}>*/}
                    {/*        <Typography className="title">{t('translation:registerContent')}</Typography>*/}
                    {/*        <button onClick={handleCloseRegisterForm} className='button'>*/}
                    {/*            <CancelIcon/>*/}
                    {/*        </button>*/}
                    {/*    </Box>*/}
                    {/*    <Box className="body">*/}
                    {/*        {contentType === '' ?*/}
                    {/*            <ContentListOfContentType setContentType={setContentType}/>*/}
                    {/*            :*/}
                    {/*            <Box>*/}
                    {/*                <NewContent contentType={contentType}/>*/}
                    {/*            </Box>*/}
                    {/*        }*/}
                    {/*    </Box>*/}
                    {/*    {contentType !== "" ? <StyledFooterRegisterContent>*/}
                    {/*        <StyledButton bg={primary} onClick={register}>*/}
                    {/*            {t('translation:register')}*/}
                    {/*        </StyledButton>*/}
                    {/*    </StyledFooterRegisterContent> : ''}*/}
                    {/*</div>*/}

                    <ModalAround>
                        <ModalBox>
                            {/*<Box className={clsx('header', (lang === 'en' ? 'flexDirL' : 'flexDirR'))}>*/}
                            {/*    <Typography className="title">{t('translation:registerContent')}</Typography>*/}
                            {/*    <button onClick={handleCloseRegisterForm} className='button'>*/}
                            {/*        <CancelIcon/>*/}
                            {/*    </button>*/}
                            {/*</Box>*/}
                            <ModalBody>
                                {contentType === '' ?<ContentListOfContentType setContentType={setContentType}/>
                                    :<NewContent contentType={contentType}/>
                                }
                            </ModalBody>
                        </ModalBox>
                    </ModalAround>
                    </div>
                </Fade>

            </Modal>

        </>);
}

export default withNamespaces('user,translation')(ContentRegisterModalComponent);
