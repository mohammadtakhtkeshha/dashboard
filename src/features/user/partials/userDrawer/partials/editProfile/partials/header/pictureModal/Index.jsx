import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import {makeStyles} from "@material-ui/styles";
import {Modal, Box, Fade} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import HelpIcon from "@material-ui/icons/Help";

import {ReactComponent as Exit} from "assets/svg/exit.svg";
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";
import {StyledCancelButton, ModalBody} from "assets/js/library/components/modal"
import {StyledSvg} from "assets/js/library/base/all"
import {modalClasses} from "assets/js/library/components/modal";
import EditPictureContent from "./partials/EditPictureContent.jsx";

const useStyle = makeStyles(modalClasses);

function EditProfileModalPictureComponent({t, user, setUser, isOpen, setIsOpen}) {
    const classes = useStyle({maxWidth: '700px'});
    const [isTourOpen, setIsTourOpen] = useState(false);

    const clicked = () => {
        setIsTourOpen(true);
    }

    return (<Modal aria-labelledby="transition-modal-title"
                   aria-describedby="transition-modal-description"
                   className={classes.modal}
                   open={isOpen}
                   onClose={() => setIsOpen(false)}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{timeout: 500}}>
        <Fade in={isOpen} id="modal">
            <Box>
                <StyledCancelButton onClick={() => setIsOpen(false)}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody height='390px'>
                    <EditPictureContent user={user} setUser={setUser} setIsOpen={setIsOpen} isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen}/>
                </ModalBody>
                <StyledTourButton onClick={clicked}>
                    <HelpIcon/>
                </StyledTourButton>
            </Box>
        </Fade>
    </Modal>);
}

export default withNamespaces('translation')(EditProfileModalPictureComponent);
