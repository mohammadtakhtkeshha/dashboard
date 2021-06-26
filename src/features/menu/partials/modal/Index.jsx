import React from "react"

import {makeStyles} from "@material-ui/styles"
import {Modal, Box, Backdrop, Fade} from "@material-ui/core"

import {StyledCancelButton, ModalBody} from "assets/js/library/components/modal"
import {StyledSvg} from "assets/js/library/base/all"
import {ReactComponent as Exit} from "assets/svg/exit.svg"
import MenuFormComponent from "./partials/MenuFormComponent.jsx"
import {modalClasses} from "assets/js/library/components/modal";
import MenuTourComponent from "./partials/MenuTourComponent.jsx";

const useStyle = makeStyles(modalClasses)

export default function Index({openForm, setOpenForm, menus, errors, setErrors, menu, setMenu, getMenus, closeForm, link, setLink}) {
    const classes = useStyle({maxWidth: '700px'})

    return (<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openForm.show}
        onClose={closeForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        <Fade in={openForm.show} id="modal">
            <Box>
                <StyledCancelButton onClick={closeForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <MenuFormComponent closeForm={closeForm}
                                       errors={errors}
                                       setOpenForm={setOpenForm}
                                       link={link}
                                       setLink={setLink}
                                       getMenus={getMenus}
                                       menu={menu}
                                       setMenu={setMenu}
                                       setErrors={setErrors} menus={menus} openForm={openForm}/>
                </ModalBody>
                <MenuTourComponent/>
            </Box>
        </Fade>
    </Modal>)
}

