import React from "react";
import clsx from "clsx";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Box, Typography} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import EditUserComponent from "../forms/EditUserComponent";
import {useStyles} from 'assets/js/user/users';
import i18next from "i18next";
import {withNamespaces} from "react-i18next";
import {makeStyles} from "@material-ui/styles";
import {StyledButton} from "../../../../../assets/js/App";

const currentStyles=makeStyles(useStyles);

function userEditModalComponent({t,openEditForm,handleEditFormClose,valueRoles,keyRoles,editedUser}) {
    const classes = currentStyles();
    const lang = i18next.language;

    return(<>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openEditForm.show}
            onClose={handleEditFormClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openEditForm.show} id="modal">
                <div className={classes.paper} dir="rtl">
                    <Box className={clsx('header', (lang === 'en' ? 'flexDirL' : 'flexDirR'))}>
                        <Typography className="title">{t('users:editUser')}</Typography>
                        <StyledButton onClick={handleEditFormClose}>
                            <CancelIcon/>
                        </StyledButton>
                    </Box>
                    <Box className="body">
                        <EditUserComponent editedUser={editedUser} id={openEditForm.id} keyRoles={keyRoles}
                                           valueRoles={valueRoles}/>
                    </Box>
                </div>
            </Fade>
        </Modal>
    </>);
}

export default withNamespaces('translation')(userEditModalComponent);
