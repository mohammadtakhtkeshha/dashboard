import React from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {makeStyles} from "@material-ui/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"

import {useStyles} from "assets/js/user/users"
import {ModalBody, StyledDirection, StyledSvg} from "assets/js/App"
import {StyledCancelButton} from "assets/js/content/partials/contentModal"
import {ReactComponent as Exit} from "assets/svg/exit.svg"
import StateFormComponent from "./partials/StateFormComponent.jsx"

const useStyle = makeStyles(useStyles)

function Index({t, openForm, setOpenForm, handleCloseForm, states, errors, setErrors, category, setCategory, setStates, setIds, handlePagination, closeForm}) {
    let lang = i18next.language
    const classes = useStyle()

    return (<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openForm.show}
        onClose={handleCloseForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        <Fade in={openForm.show} id="modal">
            <StyledDirection lang={lang}>
                <StyledCancelButton onClick={handleCloseForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <StateFormComponent closeForm={closeForm}
                                        errors={errors}
                                        setIds={setIds}
                                        handlePagination={handlePagination}
                                        setOpenForm={setOpenForm}
                                        setStates={setStates}
                                        category={category}
                                        setCategory={setCategory}
                                        setErrors={setErrors}
                                        states={states}
                                        openForm={openForm}/>
                </ModalBody>
            </StyledDirection>
        </Fade>
    </Modal>)
}

export default withNamespaces('translation')(Index)
