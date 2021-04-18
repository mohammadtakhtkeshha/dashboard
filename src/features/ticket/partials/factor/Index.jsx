import React, {useState} from "react";
import {withNamespaces} from "react-i18next";

import storage from "libraries/local-storage";
import {StyledTicketPaper} from "assets/js/library/pages/ticket";
import LoginComponent from "infrastructure/unauthorized/LoginComponent.jsx";
import FactorsComponent from "./partials/FactorsComponent.jsx"

export function Index() {
    const [isTicketLogin, setIsTicketLogIn] = useState(storage.get(process.env.REACT_APP_ISTICKET_LOGIN))

    return (<div>
        {isTicketLogin === "true" ? <FactorsComponent/> :
            <StyledTicketPaper>
                <LoginComponent isTicketLogin="true"
                                setIsTicketLogIn={setIsTicketLogIn}/>
            </StyledTicketPaper>}
    </div>)
}

export default withNamespaces('contents,translation')(Index);
