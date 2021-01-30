import React from "react"
import {StyledModalHeader} from "assets/js/library/layout/modal";
import {withNamespaces} from "react-i18next";

function HeaderFormComponent({t}) {
    return (<StyledModalHeader>{t('tickets:newTicket')}</StyledModalHeader>)

}

export default withNamespaces('tickets')(HeaderFormComponent)
