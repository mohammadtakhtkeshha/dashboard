import {Method} from "structure/layout.js"
import {getTicketsUrl, getDepartemantUrl, getOrdersUrl, baseTicket} from "utils/urls/ticket.url";
import axios from 'axios';
import {cjcsrfauthHeader} from "../../utils/headers";

export const getTickets = (handleError) => {
    return Method({
        url: getTicketsUrl,
        method: 'get',
        handleError: handleError,
    })
}

export const getDepartmenList = (handleError) => {
    return Method({
        url: getDepartemantUrl,
        method: 'get',
        handleError: handleError
    })
}

export const addTicket = (handleError,params) => {
    return Method({method: 'POST', url: 'http://crm.webrbp.ir/ticketProxy.php', handleError: handleError,params:params});
    // const url = "http://localhost/whm/includes/api.php?action=OpenTicket&username=sBnBbvTbSBpFfIWKeCycxDHNqh8U2vn6&password=F5tqf9CdD6rLYpIdITlHryNzevXUDe6d&deptid=3&subject=ddd&message=<p>aaaaa</p>&clientid=387&priority=Medium&markdown=true&responsetype=json&Access-Control-Allow-Origin=*";
    // return Method({method: 'POST', url: url, handleError: handleError});

}

export const addTicketReply = (handleError,params) => {
    return Method({method: 'POST', url: baseTicket, handleError: handleError,params:params});
}

export const getOrders = (handleError) => {
    return Method({method: 'GET', url: getOrdersUrl, handleError: handleError});
}

export const getClientId = (handleError, params) => {
    return Method({method: 'GET', url: baseTicket, handleError: handleError, params: params});
}

export const getTicket = (handleError, params) => {
    return Method({method: 'GET', url: baseTicket, handleError: handleError, params: params});
}
