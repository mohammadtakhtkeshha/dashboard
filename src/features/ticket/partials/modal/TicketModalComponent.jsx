import React from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {makeStyles} from "@material-ui/styles"
import {Modal,Backdrop,Box,Fade} from "@material-ui/core/"

import {useStyles} from "assets/js/ticket/ticketModal"
import {ReactComponent as Exit} from "assets/svg/exit.svg"
import TicketRegisterComponent from "./partials/form/Index.jsx"
import TicketDepartemanListComponent from "./partials/TicketDepartemanListComponent.jsx";
import {StyledCancelButton,ModalBody} from "assets/js/library/components/modal"
import {StyledSvg} from "assets/js/library/base/all"
import {modalClasses} from "assets/js/library/components/modal";

const useStyle = makeStyles(modalClasses)

function Index({t, openForm, previewUrl,setPreviewUrl,setOpenForm, departemanList, closeForm, ticket, setTicket, errors, setErrors, chosenDepartment, setChosenDepartment, setTickets, handlePagination}) {
    let lang = i18next.language
    const classes = useStyle({maxWidth: chosenDepartment === "" ?'600px':'800px'})

    return (<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openForm.show ? openForm.show : false}
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
                    {chosenDepartment !== "" ?
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
                                                 chosenDepartment={chosenDepartment}
                                                 setChosenDepartment={setChosenDepartment}
                                                 setPreviewUrl={setPreviewUrl}
                                                 previewUrl={previewUrl}/>
                        :
                        <TicketDepartemanListComponent departemanList={departemanList}
                                                       setChosenDepartment={setChosenDepartment}
                                                       setTicket={setTicket}
                        />}

                </ModalBody>
            </Box>
        </Fade>
    </Modal>)
}

export default withNamespaces('translation')(Index)
