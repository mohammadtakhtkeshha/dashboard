import React, {useContext} from "react";

import {StyledModalFooter} from "assets/js/App";
import {StyledRegisterButton} from "assets/js/library/components/buttons";
import {isObjectEmpty} from "methods/commons";
import {withNamespaces} from "react-i18next";
import {registerMethod} from "./FooterFormComponent.js";
import AppContext from "contexts/AppContext";

function FooterFormComponent({t, errors,params,setTickets,handlePagination,closeForm}) {
    const appContext = useContext(AppContext)

    const register = () => {
        registerMethod(t,appContext,params,setTickets,handlePagination,closeForm)
    }


    return (<StyledModalFooter>
            <StyledRegisterButton onClick={register} status={isObjectEmpty(errors)}>
                {t('translation:register')}
            </StyledRegisterButton>
        </StyledModalFooter>
    )

}

export default withNamespaces('tickets')(FooterFormComponent)
