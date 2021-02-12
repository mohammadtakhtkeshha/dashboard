import React, {useState, useEffect, useContext} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {makeStyles} from "@material-ui/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"

import {useStyles} from "assets/js/ticket/ticketModal"
import {ModalBody, StyledDirection, StyledSvg} from "assets/js/App"
import {StyledCancelButton} from "assets/js/content/partials/contentModal"
import {ReactComponent as Exit} from "assets/svg/exit.svg"
import TicketRegisterComponent from "./partials/form/Index.jsx"
import TicketDepartemanListComponent from "./partials/TicketDepartemanListComponent.jsx";
import {getDepartmenListMethod} from "./TicketModalComponent.js"
import AppContext from "contexts/AppContext";
import {getClientIdMethod} from "./TicketModalComponent.js";
import storage from "libraries/local-storage";

const useStyle = makeStyles(useStyles)

function Index({t, openForm, setOpenForm, departemanList, closeForm, ticket, setTicket, errors, setErrors,chosenDeparteman,setChosenDeparteman,setTickets,handlePagination}) {
    let lang = i18next.language
    const classes = useStyle({chosen:chosenDeparteman})

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
            <StyledDirection lang={lang}>
                <StyledCancelButton onClick={closeForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    {/*{chosenDeparteman !== "" ? */}
                        <TicketRegisterComponent ticket={ticket}
                                                                        errors={errors}
                                                                        showHeader={true}
                                                                        openForm={openForm}
                                                                        setErrors={setErrors}
                                                                        setTicket={setTicket}
                                                                        setTickets={setTickets}
                                                                        closeForm={closeForm}
                                                                        handlePagination={handlePagination}
                                                                        departemanList={departemanList}
                                                                        chosen={chosenDeparteman}
                                                                        setChosenDeparteman={setChosenDeparteman}/>
                        {/*//                                                 :*/}
                        {/*// <TicketDepartemanListComponent departemanList={departemanList}*/}
                        {/*//                                setChosenDeparteman={setChosenDeparteman}*/}
                        {/*//                                setTicket={setTicket}*/}
                        {/*/>}*/}

                </ModalBody>
            </StyledDirection>
        </Fade>
    </Modal>)
}

export default withNamespaces('translation')(Index)
