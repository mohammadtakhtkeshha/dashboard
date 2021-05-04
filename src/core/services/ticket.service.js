import {ticketMethod} from "features/ticket/Index.js"
import axios from 'axios';
import {getTicketsUrl, getDepartemantUrl, getOrdersUrl, baseTicket} from "utils/urls/ticket.url";
import {cmHeader} from "utils/headers";
import {get} from "libraries/local-storage"

export const getTickets = (handleError) => {
    const params = {
        action:'GetTickets',
        username:'sBnBbvTbSBpFfIWKeCycxDHNqh8U2vn6',
        password:'F5tqf9CdD6rLYpIdITlHryNzevXUDe6d',
        responsetype:'json',
        limitstart:0,
        limitnum:20,
        clientid:get(process.env.REACT_APP_USER_CLIENT_ID),
        'Access-Control-Allow-Origin':'*'
    }
    return ticketMethod({
        url: getTicketsUrl,
        method: 'get',
        params: params,
        handleError: handleError,
    })
}

export const getDepartmenList = (handleError) => {
    return ticketMethod({
        url: getDepartemantUrl,
        method: 'get',
        handleError: handleError
    })
}

export const addTicket = (handleError, params) => {
    const formData = new FormData();
    formData.append('subject', params.subject);
    formData.append("message", params.message);
    formData.append("deptid", params.deptid);//6
    formData.append("clientid", params.clientid);//215
    formData.append("priority", params.priority);//Medium
    formData.append("markdown", params.markdown);//true
    formData.append("serviceid", params.serviceid);//378
    formData.append("action", params.action);//378

    let filesObject = {};
    if(params.files && params.files.length>0){
        for (let i = 0; i < params.files.length; i++) {
            filesObject[`file${i}`] = params.files[i]
        }
        for (let key in filesObject) {
            formData.append(key,filesObject[key])
        }
    }

    return axios.post('http://crm.webrbp.ir/ticketProxy.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const addTicketReply = (handleError, params) => {
    const formData = new FormData();
    // formData.append('subject', params.subject);
    formData.append("message", params.message);
    // formData.append("deptid", params.deptid);//6
    formData.append("clientid", params.clientid);//215
    // formData.append("priority", params.priority);//Medium
    formData.append("markdown", params.markdown);//true
    // formData.append("serviceid", params.serviceid);//378
    formData.append("action", params.action);//378
    formData.append("ticketid", params.ticketid);//378
    // formData.append("file1", params.file0);

    if(params.files){
        let filesObject = {};
        for (let i = 0; i < params.files.length; i++) {
            filesObject[`file${i}`] = params.files[i]
        }
        for (let key in filesObject) {
            formData.append(key,filesObject[key])
        }
    }


    return axios.post('http://crm.webrbp.ir/ticketProxy.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getOrders = (handleError) => {
    return ticketMethod({method: 'GET', url: getOrdersUrl, handleError: handleError});
}

export const getClientId = (handleError, params) => {
    return ticketMethod({method: 'GET', url: baseTicket, handleError: handleError, params: params});
}

export const getTicket = (handleError, params) => {
    return ticketMethod({method: 'GET', url: baseTicket, handleError: handleError, params: params});
}

export const ticketLogin = (user, handleError,lang,t) => {
    const params = {
        action: 'ValidateLogin',
        username: 'sBnBbvTbSBpFfIWKeCycxDHNqh8U2vn6',
        password: 'F5tqf9CdD6rLYpIdITlHryNzevXUDe6d',
        responsetype: 'json',
        'Access-Control-Allow-Origin': '*',
        email: user.name,
        password2: user.pass
    }
    return ticketMethod({method: 'GET', url: baseTicket, headers: cmHeader, handleError: handleError, params: params,lang:lang,t:t});
}
