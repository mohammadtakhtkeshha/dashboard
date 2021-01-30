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
        setReplies(response.data.replies.reply.reverse())
        setTicket(prevState => {
            return {...prevState, ticketid: response.data.ticketid}
        })
    })
}

export const registerReplyMethod = (t, appContext, ticket, getTicketRepliesMethod, id, setReplies, setTicket, closeForm) => {
    addTicketReply(appContext.handleError, ticket).then(response => {
        getTicketRepliesMethod(appContext, setTicket, id, setReplies)
        success(t('translation:successDone'), t('translation:ok'));
        closeForm()
    })
}

export const styledExpansionPanelSummary = () => ({
    root: {
        backgroundImage: props => props.lang === "en" ? `linear-gradient(to left,${blue[5]},${green[4]})` : `linear-gradient(to right,${blue[5]}, ${green[4]})`
    }
})

export const styledExpansionPanelDetails = () => ({
    root: {
        padding: "0!important"
    }
})

export const styledExpansionPanel = () => ({
    root: {
        margin: "0!important"
    }
})

export const StyledBackground = styled.div`
            background-color:${grey[17]}; 

`


export const StyledRegisterButtonTicketReply = styled.button`
            width:100%;
            color: ${white[0]};
            font-size: 17px;
            font-weight: bold;
            border: 0;
            background-color: ${green[0]};
            padding: 12px;
            border-radius: 0 0 5px 5px;
            cursor:pointer;
            &:focus{
               outline:0!important;
            }

`

export const StyledBody = styled(StyledBackground)`
            margin-top:0;
`

export const StyledExpansionTitle = styled.span`
            color:${white[0]}; 
`

export const StyledReplyBox = styled.div`
            background-color:${white[0]};
            width:85%;
            padding: 20px;
            margin: 15px 18px 15px 0;
            box-sizing: border-box;
            display: flex;
            box-shadow: 0px 3px 12px #bebebe;
            border-radius: 5px;
            margin-right:${props => props.align === true ? "auto" : "0"}
            flex-direction:${props => props.align === true ? "row" : "row-reverse"}
          
`

export const StyledCollapse = styled.div`
           border-radius:0 0 5px 5px;
`

export const styledCardMedia = () => ({
    root: {
        width: '80px',
        height: '80px',
        borderRadius: '5px',
        margin: '10px'
    }
})

export const StyledTextBlock = styled.div`
        width:80%;
        & div{ box-sizing: border-box;
        line-height: 2;
        margin: 0;
        border-radius: 3px;
        color: #616161;
        font-size: 13px;
        min-height: 160px;
        padding: 30px 10px;
        position: relative;
            }
`

export const StyledImageBlock = styled.div`
               width:180px;
               display:flex;
               flex-direction:column;
               align-items:center;
               padding: 13px 11px;
               vertical-align: top;
               border-radius: 5px;
               border: 1px solid #f5f5f5;
`

export const StyledRoleBlock = styled.div`
        background-color:${purpel[0]};
        color:white;
        border-radius: 3px;
        border: 2px solid #3F51B5;
        height: 30px;
        margin: 0;
        text-align: center;
        min-width: 100px;
        display:flex;
        align-items:center;
        width:156px;
         & span {
            margin:auto;
         }
`

export const styledUserCardMedia = () => ({
    root: {
        width: '15px',
        height: '20px',
    }
})

export const StyledUserBlock = styled.div`
                display:flex;
                background-color:${grey[19]}
                color: ${grey[20]};
                font-size: 14px;
                padding: 5px;
                border-radius: 3px;
                line-height: 9px;
                margin-bottom: 10px;
                text-align: center;
                width: 156px;
                background-color: #f9f8f8;
                & p {
                    margin:auto;
                }
`

export const StyledDateBlock = styled.div`
                color: #ff620d;
                display: inline-block;
                direction: ltr;
                font-size: 11px;
                padding: 3px 5px 0;
                margin-top:30px;
               
`

export const StyledReplyBackground = styled.div`
             background-color:${white[0]}
             padding:20px;
`

export const constTicket = {
    action: 'AddTicketReply',
    username: 'sBnBbvTbSBpFfIWKeCycxDHNqh8U2vn6',
    password: 'F5tqf9CdD6rLYpIdITlHryNzevXUDe6d',
    ticketid: '',
    message: '',
    clientid: '',
    attachments: 'W3sibmFtZSI6InR0LnR4dCIsImRhdGEiOiJjMkZzWVcwPSJ9XQ==',
    markdown: true,
    responsetype: 'json',
    'Access-Control-Allow-Origin': '*',
}

