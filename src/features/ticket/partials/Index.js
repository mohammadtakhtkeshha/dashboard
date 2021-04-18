import {getDepartmenList, getTickets} from "core/services/ticket.service"
import {chunkItem, handleTotalPage} from "infrastructure/layout"
import {getClientId, getTicket} from "core/services/ticket.service"
import {get} from "libraries/local-storage"

export const handlePaginationMethod = (tickets, changeDefault, setChunkTickets, setTotalPage, setTickets) => {
    const chunks = chunkItem(tickets)
    changeDefault && setTickets(tickets)
    setChunkTickets(chunks)
    const totalPage = handleTotalPage(tickets)
    setTotalPage(totalPage)
}

export const getTicketsMethod = (appContext, setTickets, handlePagination) => {
    appContext.setLoading(true)
    getTickets(appContext.handleError).then(response => {
        appContext.setLoading(false)
        handlePagination(response.data.tickets.ticket, true)
    })
}

export const getDepartmenListMethod = (appContext, setDepartemanList) => {
    getDepartmenList(appContext.handleError).then((response) => {
        const department = response.data.departments.department
        setDepartemanList(department)
    })
}

export const constTicket = {
    // action: 'OpenTicket',
    // username: 'sBnBbvTbSBpFfIWKeCycxDHNqh8U2vn6',
    // password: 'F5tqf9CdD6rLYpIdITlHryNzevXUDe6d',
    deptid: '',
    serviceid: 0,
    subject: '',
    message: '',
    clientid: '',
    priority: 'High',
    // attachments: 'W3sibmFtZSI6InR0LnR4dCIsImRhdGEiOiJjMkZzWVcwPSJ9XQ==',
    markdown: true,
    // responsetype: 'json',
    // 'Access-Control-Allow-Origin': '*',
}

export const getClientIdMethod = (appContext, currentUser, setTicket) => {
    const curClientid = get(process.env.REACT_APP_USER_CLIENT_ID)
    setTicket(prevState => {
        return {
            ...prevState,
            clientid: curClientid,
        }
    })
}


