import React from "react"
import {withNamespaces} from "react-i18next"

import {StyledModalBody} from "assets/js/App"
import {StyledMarginBottom} from "assets/js/ticket/ticketRegister"

import FooterFormComponent from "./partials/FooterFormComponent.jsx"
import HeaderFormComponent from "./partials/HeaderFormComponent.jsx"
import BodyFormComponent from "./partials/BodyFormComponent.jsx"

function Index({t, departemanList,setPreviewUrl,previewUrl, ticket, setTicket, errors, openForm, setErrors, chosenDepartment, setTickets, handlePagination,closeForm,setChosenDepartment}) {

    return (<>
        <HeaderFormComponent/>
        <StyledModalBody>
            <StyledMarginBottom>
                <BodyFormComponent departemanList={departemanList}
                                   ticket={ticket}
                                   setTicket={setTicket}
                                   fromreply="true"
                                   setErrors={setErrors}
                                   chosenDepartment={chosenDepartment}
                                   openForm={openForm}
                                   previewUrl={previewUrl}
                                   setChosenDepartment={setChosenDepartment}
                                   setPreviewUrl={setPreviewUrl}
                                   errors={errors}/>
            </StyledMarginBottom>
        </StyledModalBody>
        <FooterFormComponent errors={errors}
                             params={ticket}
                             setTickets={setTickets}
                             closeForm={closeForm}
                             handlePagination={handlePagination}/>
    </>)

}

export default withNamespaces('tickets')(Index)
