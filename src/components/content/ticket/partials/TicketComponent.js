import {getTicket, addTicketReply} from "core/services/ticket.service";
import {blue, green, grey, purpel, white} from "components/partials/Colors";
import styled from "styled-components";
import {success} from "../../../../methods/swal";

export const getTicketRepliesMethod = (appContext, setTicket, id, setReplies) => {
    const params = {
        action: "GetTicket",
        username: "sBnBbvTbSBpFfIWKeCycxDHNqh8U2vn6",
        password: "F5tqf9CdD6rLYpIdITlHryNzevXUDe6d",
        responsetype: "json",
        ticketnum: id,
    }
    appContext.setLoading(true)
    getTicket(appContext.handleError, params).then(response => {
        appContext.setLoading(false)
            setTicket(prevState => {
                return {...prevState, ticketid: response.data.ticketid}
            })
        for(let eachReply of response.data.replies.reply){
            for(let i in eachReply.attachments){
                eachReply.attachments[i].dlUrl=`http://crm.webrbp.ir/dl.php?type=ar&id=${eachReply.replyid}&i=${i}`
            }
        }
        debugger
        setReplies(response.data.replies.reply.reverse())
    })
}

export const registerReplyMethod = (t, appContext, ticket, getTicketRepliesMethod, id, setReplies, setTicket, closeForm) => {
    addTicketReply(appContext.handleError, ticket).then(response => {
        getTicketRepliesMethod(appContext, setTicket, id, setReplies)
        success(t('translation:successDone'), t('translation:ok'));
        closeForm()
    })
}

export const toHtml = (message) => {
    message = message.replaceAll("&lt;", "<");
    message = message.replaceAll("&gt;", ">");
    message = message.replaceAll("&amp;lt;", "<");
    message = message.replaceAll("&amp;gt;", ">");
    message = message.replaceAll("&nbsp;", " ");
    message = message.replaceAll("&amp;nbsp;", " ");
    return message
}
