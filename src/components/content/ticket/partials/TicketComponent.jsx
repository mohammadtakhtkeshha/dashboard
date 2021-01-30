import React, {useContext, useEffect, useState} from "react"
import {Helmet} from "react-helmet"
import {withNamespaces} from 'react-i18next'
import AppContext from "contexts/AppContext"
import {useParams} from "react-router-dom"
import i18next from "i18next"

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {withStyles, Typography} from "@material-ui/core"
import {CardMedia} from '@material-ui/core'
import BookmarkIcon from '@material-ui/icons/Bookmark'

import {
    StyledBox,
    StyledPaper,
    StyledTable,
    StyledRegisterButton,
} from "assets/js/App"
import {
    getTicketRepliesMethod,
    StyledBody,
    registerReplyMethod,
    StyledRegisterButtonTicketReply
} from "./TicketComponent.js"
import {getClientIdMethod} from "../Index.js"
import TicketRegisterBody from "./modal/partials/form/partials/BodyFormComponent.jsx"
import storage from "libraries/local-storage"
import TicketHeaderComponent from "./TicketHeaderComponent"
import gravatar from "assets/media/image/ticket/gravatar.jpg"
import user from "assets/svg/user.svg"

import {
    styledExpansionPanelSummary, styledExpansionPanelDetails,
    styledCardMedia, StyledExpansionTitle, styledExpansionPanel,
    StyledBackground,
    StyledCollapse,
    StyledRoleBlock,
    StyledReplyBackground,
    StyledDateBlock,
    styledUserCardMedia,
    constTicket,
    StyledUserBlock,
    StyledReplyBox, StyledTextBlock, StyledImageBlock
} from "./TicketComponent.js"

const StyledExpansionPanelSummary = withStyles(styledExpansionPanelSummary)(ExpansionPanelSummary)
const StyledExpansionPanelDetails = withStyles(styledExpansionPanelDetails)(ExpansionPanelDetails)
const StyledExpansionPanel = withStyles(styledExpansionPanel)(ExpansionPanel)
const StyledCardMedia = withStyles(styledCardMedia)(CardMedia)
const StyledUserCardMedia = withStyles(styledUserCardMedia)(CardMedia)

function TicketComponent({t}) {
    const appContext = useContext(AppContext)
    const lang = i18next.language
    const params = useParams()
    const [ticket, setTicket] = useState(constTicket)
    const [replies, setReplies] = useState([])
    const [errors, setErrors] = useState({})
    const currentUser = JSON.parse(storage.get('user'))

    useEffect(() => {
        getTicketRepliesMethod(appContext, setTicket, params.id, setReplies)
        getClientIdMethod(appContext, currentUser, setTicket)
    }, [])

    const closeForm = () => {
        setErrors({})
        setTicket(constTicket)
    }

    const handleErrors = () => {
    }

    const registerReply = () => {
        registerReplyMethod(t, appContext, ticket, getTicketRepliesMethod, params.id, setReplies, setTicket, closeForm)
    }

    return (
        <>
            <Helmet>
                <title>
                    {t('sidebar:support')}
                </title>
            </Helmet>
            <StyledPaper>
                <StyledPaper>
                    <StyledCollapse id="padding">
                        <StyledExpansionPanel>
                            <StyledExpansionPanelSummary lang={lang} expandIcon={<ExpandMoreIcon/>}>
                                <StyledExpansionTitle>{t('translation:answer')}</StyledExpansionTitle>
                            </StyledExpansionPanelSummary>
                            <StyledExpansionPanelDetails>
                                <StyledBody>
                                    <TicketRegisterBody
                                        ticket={ticket}
                                        fromreply="false"
                                        departemanList={[]}
                                        setTicket={setTicket}
                                        errors={errors}
                                        openForm={false}
                                        setErrors={setErrors}/>
                                    <StyledRegisterButtonTicketReply onClick={registerReply}>
                                        {t('translation:register')}
                                    </StyledRegisterButtonTicketReply>
                                </StyledBody>
                            </StyledExpansionPanelDetails>
                        </StyledExpansionPanel>
                        <StyledReplyBackground id="test">
                            {replies.length > 0 ? replies.map((item, index) => (
                                    <StyledReplyBox key={index} align={item.admin !== "" ? true : false}>
                                        <StyledTextBlock>
                                            <div dangerouslySetInnerHTML={{__html: item.message}}/>
                                        </StyledTextBlock>
                                        <StyledImageBlock>
                                            <StyledCardMedia image={gravatar}/>
                                            <StyledUserBlock>
                                                <StyledUserCardMedia image={user}/>
                                                <Typography>{item.admin === "" ? item.name : item.admin}</Typography>
                                            </StyledUserBlock>
                                            <StyledRoleBlock>
                                                <BookmarkIcon/>
                                                <Typography
                                                    component="span">{item.admin === "" ? t('translation:customer') : item.admin} </Typography>
                                            </StyledRoleBlock>
                                            <StyledDateBlock component="span">{item.date} </StyledDateBlock>
                                        </StyledImageBlock>
                                    </StyledReplyBox>))
                                : <></>}
                        </StyledReplyBackground>
                    </StyledCollapse>
                </StyledPaper>
            </StyledPaper>
        </>
    )
}

export default withNamespaces('tickets')(TicketComponent)
