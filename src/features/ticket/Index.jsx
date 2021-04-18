import React, {useState, useEffect} from "react"
import storage from "libraries/local-storage"
import TicketsComponent from "./partials/Index.jsx"
import LoginComponent from "infrastructure/unauthorized/LoginComponent.jsx";
import {StyledTicketPaper} from "assets/js/library/pages/ticket"

const Index = () => {
    const [isTicketLogin, setIsTicketLogIn] = useState(storage.get(process.env.REACT_APP_ISTICKET_LOGIN))

    const change = () => {
        setIsTicketLogIn("false")
        storage.remove(process.env.REACT_APP_ISTICKET_LOGIN)
    }

    useEffect(() => {
        const loginTime = parseInt(storage.get(process.env.REACT_APP_TICKET_PERIOD))
        const currentTime = Date.now()
        if (currentTime - loginTime > 7200000) {
            setIsTicketLogIn("false")
            storage.remove(process.env.REACT_APP_ISTICKET_LOGIN)
        }
    }, [])

    return (<>
        {/*<button onClick={change}>button</button>*/}
        {isTicketLogin === "true" ? <TicketsComponent/> :
            <StyledTicketPaper>
                <LoginComponent isTicketLogin="true"
                                setIsTicketLogIn={setIsTicketLogIn}/>
            </StyledTicketPaper>}
    </>)
}

export default Index

