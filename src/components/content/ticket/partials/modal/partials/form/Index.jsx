import React from "react"
import {withNamespaces} from "react-i18next"

import {StyledModalBody} from "assets/js/library/layout/modal"
import {StyledMarginBottom} from "assets/js/ticket/ticketRegister"

import FooterFormComponent from "./partials/FooterFormComponent.jsx"
import HeaderFormComponent from "./partials/HeaderFormComponent.jsx"
import BodyFormComponent from "./partials/BodyFormComponent.jsx"

function Index({t, departemanList, ticket, setTicket, errors, openForm, setErrors, chosen, setTickets, handlePagination,closeForm}) {

    return (<>
        <HeaderFormComponent/>
        <StyledModalBody>
            <StyledMarginBottom>
                <BodyFormComponent departemanList={departemanList}
                                   ticket={ticket}
                                   setTicket={setTicket}
                                   fromreply="true"
                                   setErrors={setErrors}
                                   chosen={chosen}
                                   openForm={openForm}
                                   errors={errors}/>
            </StyledMarginBottom>
        </StyledModalBody>
        <FooterFormComponent errors={errors} params={ticket}
                             setTickets={setTickets}
                             closeForm={closeForm}
                             handlePagination={handlePagination}/>
    </>)

}

export default withNamespaces('tickets')(Index)
