import React from "react"
import {withNamespaces} from "react-i18next"

import {makeStyles} from "@material-ui/styles"
import {Backdrop,Box,Fade,Modal} from "@material-ui/core"

import {StyledCancelButton} from "assets/js/library/components/modal"
import {StyledSvg} from "assets/js/library/base/all"
import {ReactComponent as Exit} from "assets/svg/exit.svg"

import {modalClasses} from "assets/js/library/components/modal";
import ReactPlayer from "react-player";
import video from "assets/media/video/nature.mp4";
import {ModalBodyWelcome} from "assets/js/library/pages/dashboard/welcomeDashboard"

const useStyle = makeStyles(modalClasses)

function Index({t, openModal, setOpenModal}) {
    const classes = useStyle({maxWidth: '700px'})

    return (<Modal aria-labelledby="transition-modal-title"
                   aria-describedby="transition-modal-description"
                   className={classes.modal}
                   open={openModal}
                   onClose={() => setOpenModal(false)}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{timeout: 500}}>
        <Fade in={openModal} id="modal">
            <Box>
                <StyledCancelButton onClick={() => setOpenModal(false)}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBodyWelcome>
                    <ReactPlayer controls={true} url={video}/>
                </ModalBodyWelcome>
            </Box>
        </Fade>
    </Modal>)
}

export default withNamespaces('translation')(Index)
