import React from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import clsx from "clsx";

import {makeStyles} from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Box, Typography} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

import NewUserComponent from "../forms/NewUserComponent";
import {useStyles} from "assets/js/user/users";


const useStyle=makeStyles(useStyles);

function UserRegisterModalComponent({t,openNewUser,handleCloseUserForm,getRegisteredUser,userMailList,userNameList}) {
    let lang = i18next.language;
    const classes = useStyle();

    return(<>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openNewUser}
                onClose={handleCloseUserForm}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openNewUser} id="modal">
                    <div className={classes.paper} dir="rtl">
                        <Box className={clsx('header', (lang === 'en' ? 'flexDirL' : 'flexDirR'))}>
                            <Typography className="title">{t('translation:registerUser')}</Typography>
                            <button onClick={handleCloseUserForm} className='button'>
                                <CancelIcon/>
                            </button>
                        </Box>
                        <Box className="body">
                            <NewUserComponent name="negar" getRegisteredUser={(user) => getRegisteredUser(user)}
                                              userNameList={userNameList}
                                              userMailList={userMailList}
                            />
                        </Box>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

export default withNamespaces('translation')(UserRegisterModalComponent);
