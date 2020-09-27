import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import clsx from "clsx";
import i18next from "i18next";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Box, Typography} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {makeStyles} from "@material-ui/styles";

import NewContent from "../newContent";
import {useStyles} from "assets/js/content/contentRegisterModal";
import ContentListOfContentType from "./ContentListOfContentType";
import {StyledButton} from "assets/js/App";
import {primary} from "components/partials/Colors";
import {StyledFooterRegisterContent} from "assets/js/content/contentRegisterModal";
import contentService from "core/services/content.service";
import NewContentContext from "contexts/NewContentContext";
import AppContext from "contexts/AppContext";
import ContentsContext from "contexts/ContentsContext";

const useStyle = makeStyles(useStyles);

function ContentRegisterModalComponent({t, openRegisterForm, handleCloseContentForm}) {
    const lang = i18next.language;
    const classes = useStyle();
    const [content, setContent] = useState({
        "type": {
            "target_id": ""
        },
        "title": "",
        "body": "",
        "field_domain_access": {},
        "field_domain_all_affiliates": true,
        "field_domain_source": {},
        "field_field_galeries": {},
        "field_files": {},
        "field_image": {},
        "field_rotitr": "",
        "field_sotitr": "",
        "field_sounds": {},
        "field_article_cat": {},
        "field_tags": {},
        "field_seo_list": {},
        "field_videos": {},
        "field_special_news_display": false,
        "status": false,
    });
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);
    const [contentType, setContentType] = useState('');
    const [publishDate, setPublishDate] = useState(null);
    const [unpublishDate, setUnpublishDate] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [domainAccesses, setDomainAccesses] = useState([]);
    const [selectedDomainAccess, setSelectedDomainAccess] = useState([]);

    const [errors, setErrors] = useState({});

    const handleCloseRegisterForm = () => {
        handleCloseContentForm();
        setContentType('');
    };

    const register = () => {
        if (content.title === "") {
            setErrors({title: t('translation:requiredValid')});
        }
        contentService.registerContent(content).then((response) => {
            contentsContext.getRegisteredContent(response.data);
        }).catch((error) => {
            let objError = {};
            const errorString = error.response.data.FailureReason.message.replace(/\n/g, 'a');
            const errorArray = errorString.split('.');
            for (let i in errorArray) {
                let newErrorMessage = errorArray[i].split(':');
                objError[newErrorMessage[0]] = newErrorMessage[1];
            }
            let titleError;
            const arrayError = [];
            if (objError.atitle === " This value should not be null") {
                titleError = t('contents:nullTitle')
            }
            arrayError.push(titleError)
            appContext.handleError(arrayError);
        });
    }

    const isObjectEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    useEffect(() => {
        setContent(prevState => {
            return{
                ...prevState,type: {
                    target_id:contentType
                }
            }
        });
    }, [contentType]);

    return (
        <NewContentContext.Provider
            value={{
                content: content,
                setContent: setContent,
                setErrors: setErrors,
                errors: errors,
                selectedTags: selectedTags,
                setSelectedTags: setSelectedTags,
                isObjectEmpty: isObjectEmpty,
                selectedDomainAccess: selectedDomainAccess,
                setSelectedDomainAccess: setSelectedDomainAccess,
                domainAccesses: domainAccesses,
                setDomainAccesses: setDomainAccesses,
                setUnpublishDate:setUnpublishDate,
                setPublishDate:setPublishDate,
                publishDate:publishDate,
                unpublishDate:unpublishDate,
            }}>

        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openRegisterForm}
        onClose={handleCloseRegisterForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={openRegisterForm} id="modal">
            <div className={classes.paper} dir="rtl">
                <Box className={clsx('header', (lang === 'en' ? 'flexDirL' : 'flexDirR'))}>
                    <Typography className="title">{t('translation:registerContent')}</Typography>
                    <button onClick={handleCloseRegisterForm} className='button'>
                        <CancelIcon/>
                    </button>
                </Box>
                <Box className="body">
                    {contentType === '' ?
                        <ContentListOfContentType setContentType={setContentType}/>
                        :
                        <Box>
                            <NewContent contentType={contentType}/>
                        </Box>
                    }
                </Box>
                {contentType !== "" ? <StyledFooterRegisterContent>
                    <StyledButton bg={primary} onClick={register}>
                        {t('translation:register')}
                    </StyledButton>
                </StyledFooterRegisterContent> : ''}
            </div>
        </Fade>
    </Modal>

        </NewContentContext.Provider>);
}

export default withNamespaces('user,translation')(ContentRegisterModalComponent);
