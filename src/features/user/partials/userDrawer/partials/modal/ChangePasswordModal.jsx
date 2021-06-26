import React from "react";
import {withNamespaces} from "react-i18next";

import {makeStyles} from "@material-ui/styles";
import {Modal,Box,Backdrop,Fade} from "@material-ui/core";

import {ReactComponent as Exit} from "assets/svg/exit.svg";
import {StyledCancelButton, ModalBody} from "assets/js/library/components/modal"
import {StyledSvg} from "assets/js/library/base/all"
import {modalClasses} from "assets/js/library/components/modal";
import ChangePasswordComponent from "./partials/ChangePasswordComponent.jsx"

const useStyle = makeStyles(modalClasses);

function ChangePasswordModal({t, openObserveProfile, setOpenObserveProfile}) {
    const classes = useStyle({maxWidth: '700px'});

    const closeForm = () => {
        setOpenObserveProfile(false)
    }

    return (<Modal aria-labelledby="transition-modal-title"
                   aria-describedby="transition-modal-description"
                   className={classes.modal}
                   open={openObserveProfile}
                   onClose={closeForm}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{timeout: 500}}>
        <Fade in={openObserveProfile} id="modal">
            <Box>
                <StyledCancelButton onClick={closeForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody height="fit-content">
                    <ChangePasswordComponent setOpenObserveProfile={setOpenObserveProfile}/>
                </ModalBody>
            </Box>
        </Fade>
    </Modal>);
}

export default withNamespaces('translation')(ChangePasswordModal);
