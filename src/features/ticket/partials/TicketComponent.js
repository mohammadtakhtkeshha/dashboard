import {getTicket, addTicketReply} from "core/services/ticket.service";
import {success} from "methods/swal";

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
                let id = eachReply.replyid === "0" ? response.data.ticketid : eachReply.replyid
                let type = eachReply.replyid === "0" ? 'ticket' : 'reply'
                eachReply.attachments[i].dlUrl=`http://crm.webrbp.ir/imageProxy.php?data=${id}_${i}_${type}`
            }
        }
        setReplies(response.data.replies.reply.reverse())
    })
}

export const registerReplyMethod = (t, appContext, ticket, getTicketRepliesMethod, id, setReplies, setTicket, closeForm) => {
   appContext.setLoading(true)
    addTicketReply(appContext.handleError, ticket).then(response => {
        appContext.setLoading(false)
        getTicketRepliesMethod(appContext, setTicket, id, setReplies)
        success(t('translation:successDone'), t('translation:ok'));
        closeForm()
    })
}


