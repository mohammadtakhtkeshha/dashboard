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

import {StyledPaper} from "assets/js/App"
import {getTicketRepliesMethod, registerReplyMethod, toHtml} from "./TicketComponent.js"
import {getClientIdMethod} from "./Index.js"
import TicketRegisterBody from "./modal/partials/form/partials/BodyFormComponent.jsx"
import storage from "libraries/local-storage"
import gravatar from "assets/media/image/ticket/gravatar.jpg"
import user from "assets/svg/user.svg"
import {StyledUrlBlock} from "assets/js/ticket/ticket"
import downloadPng from "assets/svg/download.png"

import {
    styledExpansionPanelSummary,
    styledExpansionPanelDetails,
    styledCardMedia,
    StyledRegisterButtonTicketReply,
    StyledExpansionTitle,
    styledExpansionPanel,
    StyledCollapse,
    StyledRoleBlock,
    StyledReplyBackground,
    StyledDateBlock,
    styledUserCardMedia,
    constTicket,
    StyledUserBlock,
    StyledReplyBox,
    StyledTextBlock,
    StyledImageBlock,
    StyledBody,
} from "assets/js/library/pages/ticket"

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
    const [isExpanded, setIsExpanded] = useState(false)
    const [previewUrl, setPreviewUrl] = useState([])

    useEffect(() => {
        getTicketRepliesMethod(appContext, setTicket, params.id, setReplies)
        getClientIdMethod(appContext, currentUser, setTicket)
    }, [])

    const closeForm = () => {
        setErrors({})
        setIsExpanded(false)
        setTicket(prevState => {
            constTicket.clientid = prevState.clientid
            return {...constTicket}
        })
        setPreviewUrl([])
    }

    const registerReply = () => {
        registerReplyMethod(t, appContext, ticket, getTicketRepliesMethod, params.id, setReplies, setTicket, closeForm)
    }

    const changeExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <>
            <Helmet>
                <title>
                    {t('sidebar:support')}
                </title>
            </Helmet>
            <StyledCollapse id="padding">
                <StyledExpansionPanel expanded={isExpanded} onChange={changeExpanded}>
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
                                previewUrl={previewUrl}
                                setPreviewUrl={setPreviewUrl}
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
                                    <div dangerouslySetInnerHTML={{__html: toHtml(item.message)}}/>
                                    {item.attachments.length > 0 &&
                                    item.attachments.map((item, index) => {
                                        return (<StyledUrlBlock>
                                            <img src={downloadPng} alt=""/>
                                            <a href={item.dlUrl} target="_blank">{item.filename}</a>
                                        </StyledUrlBlock>)
                                    })
                                    }
                                </StyledTextBlock>
                                <StyledImageBlock>
                                    <StyledCardMedia image={gravatar}/>
                                    <StyledUserBlock>
                                        <StyledUserCardMedia image={user}/>
                                        <Typography>{item.admin === "" ? item.name : item.admin}</Typography>
                                    </StyledUserBlock>
                                    <StyledRoleBlock>
                                        <BookmarkIcon/>
                                        <Typography component="span">
                                            {item.admin === "" ? t('translation:customer') : item.admin}
                                        </Typography>
                                    </StyledRoleBlock>
                                    <StyledDateBlock component="span">{item.date} </StyledDateBlock>
                                </StyledImageBlock>
                            </StyledReplyBox>))
                        : <></>}
                </StyledReplyBackground>
            </StyledCollapse>
        </>
    )
}

export default withNamespaces('tickets')(TicketComponent)
