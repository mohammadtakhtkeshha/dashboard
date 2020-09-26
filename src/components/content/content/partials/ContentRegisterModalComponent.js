import React, {useState} from "react";
import {withNamespaces} from 'react-i18next';
import clsx from "clsx";
import i18next from "i18next";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Box, Typography} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {makeStyles} from "@material-ui/styles";

import NewContent from "../newContent";
import {useStyles} from 'assets/js/content/contentRegisterModal';
import ContentListOfContentType from "./ContentListOfContentType";

const useStyle = makeStyles(useStyles);

function ContentRegisterModalComponent({t, openRegisterForm, clickCloseRegisterForm}) {
    const lang = i18next.language;
    const classes = useStyle();
    const [contentType, setContentType] = useState('');

    const handleCloseRegisterForm = () => {
        clickCloseRegisterForm();
        setContentType('');
    };

    return (<Modal
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
            <div className={classes.paper} dir="rtl">
                <Box className={clsx('header', (lang === 'en' ? 'flexDirL' : 'flexDirR'))}>
                    <Typography className="title">{t('translation:registerContent')}</Typography>
                    <button onClick={handleCloseRegisterForm} className='button'>
                        <CancelIcon/>
                    </button>
                </Box>
                <Box className="body">
                    {contentType === '' ? <ContentListOfContentType setContentType={setContentType}/> :
                        <NewContent contentType={contentType}/>}
                </Box>
            </div>
        </Fade>
    </Modal>);
}

export default withNamespaces('user,translation')(ContentRegisterModalComponent);
