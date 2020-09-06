import React from "react";
import {withNamespaces} from 'react-i18next';
import clsx from "clsx";
import i18next from "i18next";


import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Box, Typography} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

import NewContent from "../forms/newContent";
import {useStyles} from 'assets/js/content/contentRegisterModal';
import {makeStyles} from "@material-ui/styles";

const useStyle= makeStyles(useStyles);

 function ContentRegisterModalComponent({t,openRegisterForm,clickCloseRegisterForm}) {
     let lang = i18next.language;
     const classes=useStyle();


     let handleCloseRegisterForm = () => {
         clickCloseRegisterForm();
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
                    <NewContent/>
                </Box>
            </div>
        </Fade>
    </Modal>);
}

export default withNamespaces('user,translation')(ContentRegisterModalComponent);
