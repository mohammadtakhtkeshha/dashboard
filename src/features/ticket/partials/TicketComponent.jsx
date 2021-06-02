import React, {useContext, useEffect, useState, useRef} from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces} from 'react-i18next';
import AppContext from 'contexts/AppContext';
import {useParams} from 'react-router-dom';
import i18next from 'i18next';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withStyles, Typography, AccordionSummary, Accordion, AccordionDetails, Grid} from '@material-ui/core';
import {CardMedia} from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import {getTicketRepliesMethod, registerReplyMethod} from './TicketComponent.js';
import {toHtml} from 'methods/commons';
import {getClientIdMethod} from './Index.js';
import TicketRegisterBody from './modal/partials/form/partials/BodyFormComponent.jsx';
import gravatar from 'assets/media/image/ticket/gravatar.jpg';
import user from 'assets/svg/user.svg';
import {StyledUrlBlock} from 'assets/js/ticket/ticket';
import downloadPng from 'assets/svg/download.png';

import {
    styledAccordionSummary,
    styledAccordionDetails,
    styledCardMedia,
    StyledRegisterButtonTicketReply,
    StyledExpansionTitle,
    styledAccordion,
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
} from 'assets/js/library/pages/ticket';

const StyledAccordionSummary = withStyles(styledAccordionSummary)(AccordionSummary);
const StyledAccordionDetails = withStyles(styledAccordionDetails)(AccordionDetails);
const StyledAccordion = withStyles(styledAccordion)(Accordion);
const StyledCardMedia = withStyles(styledCardMedia)(CardMedia);
const StyledUserCardMedia = withStyles(styledUserCardMedia)(CardMedia);

function TicketComponent({t}) {
    const {setLoading} = useContext(AppContext);
    const lang = i18next.language;
    const heightBlock = useRef(null)
    const params = useParams();
    const [ticket, setTicket] = useState(constTicket);
    const [replies, setReplies] = useState([]);
    const [errors, setErrors] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState([]);

    useEffect(() => {
        getClientIdMethod(setTicket);
    }, []);

    useEffect(() => {
        getTicketRepliesMethod(setLoading, setTicket, params.id, setReplies);
    }, [params.id, setLoading]); //Once

    const closeForm = () => {
        setErrors({});
        setIsExpanded(false);
        setTicket(prevState => {
            constTicket.clientid = prevState.clientid;
            return {...constTicket};
        });
        setPreviewUrl([]);
    };

    const registerReply = () => {
        registerReplyMethod(setLoading, ticket, getTicketRepliesMethod, params.id, setReplies, setTicket, closeForm);
    };

    const changeExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if(replies.length > 0 ){
            const height=heightBlock
            console.log('height:'+height.current.offsetHeight)

        }
    }, [heightBlock.current]);

    // console.log(window.innerWidth)
    useEffect (() => {
        // if(replies.length > 0 ){

            const method = () => {
            console.log(heightBlock.current?.offsetHeight)
        }
        window.addEventListener('resize', method);
        return () => {
            window.removeEventListener('resize', method);
        }
        // }
    }, [])

    return (
        <>
            <Helmet>
                <title>{t('sidebar:support')}</title>
            </Helmet>
            <StyledCollapse id="padding">
                <StyledAccordion expanded={isExpanded} onChange={changeExpanded}>
                    <StyledAccordionSummary lang={lang} expandIcon={<ExpandMoreIcon/>}>
                        <StyledExpansionTitle>{t('translation:answer')}</StyledExpansionTitle>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
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
                                setErrors={setErrors}
                            />
                            <StyledRegisterButtonTicketReply
                                onClick={registerReply}>{t('translation:register')}</StyledRegisterButtonTicketReply>
                        </StyledBody>
                    </StyledAccordionDetails>
                </StyledAccordion>
                <StyledReplyBackground id="test">
                    {replies.length > 0 ? (
                        replies.map((item, index) => (
                            <StyledReplyBox ref={heightBlock} key={index} align={item.admin !== '' ? true : false}>
                                <StyledImageBlock>
                                    <StyledCardMedia image={gravatar}/>
                                    <StyledUserBlock>
                                        <StyledUserCardMedia image={user}/>
                                        <Typography>{item.admin === '' ? item.name : item.admin}</Typography>
                                    </StyledUserBlock>
                                    <StyledRoleBlock>
                                        <BookmarkIcon/>
                                        <Typography
                                            component="span">{item.admin === '' ? t('translation:customer') : item.admin}</Typography>
                                    </StyledRoleBlock>
                                    <StyledDateBlock component="span">{item.date} </StyledDateBlock>
                                </StyledImageBlock>
                                <StyledTextBlock>
                                    <div dangerouslySetInnerHTML={{__html: toHtml(item.message)}}/>
                                    {item.attachments.length > 0 &&
                                    item.attachments.map((item, index) => {
                                        return (
                                            <StyledUrlBlock key={index}>
                                                <img src={downloadPng} alt=""/>
                                                <a href={item.dlUrl} rel="noopener noreferrer" target="_blank">
                                                    {item.filename}
                                                </a>
                                            </StyledUrlBlock>
                                        );
                                    })}
                                </StyledTextBlock>
                            </StyledReplyBox>
                        ))
                    ) : (
                        <></>
                    )}
                </StyledReplyBackground>
            </StyledCollapse>
        </>
    );
}

export default withNamespaces('tickets')(TicketComponent);
