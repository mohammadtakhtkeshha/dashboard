import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import Fade from "@material-ui/core/Fade";

import contentService from "core/services/content.service";
import NewContentContext from "contexts/NewContentContext";
import {ModalBody, StyledCancelButton} from "assets/js/content/partials/contentModal";
import {StyledDirection, StyledSvg} from "assets/js/App";
import AppContext from "contexts/AppContext";
import ContentsContext from "contexts/ContentsContext";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import NewContentTabsComponent from "./tabContents/index.jsx";


function Index({t, contentType, openRegisterForm, handleCloseRegisterForm}) {
    const lang = i18next.language;
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);
    const [publishDate, setPublishDate] = useState(null);
    const [unpublishDate, setUnpublishDate] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [domainAccesses, setDomainAccesses] = useState([]);
    const [selectedDomainAccess, setSelectedDomainAccess] = useState([]);

    const [descriptionFileSrc,setDescriptionFileSrc]=useState('');

    const isObjectEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    const getDomainSource = () => {
        contentService.getDomainSource().then((response) => {
            // newContentContext.setDomainAccesses(response.data);
        }).catch((error) => {
            // console.log(error)
        });
    }

    const register = () => {
        if (appContext.content.title === "") {
            contentsContext.setErrors({title: t('translation:requiredValid')});
        }
        contentService.registerContent(appContext.content).then((response) => {
            contentsContext.getRegisteredContent(response.data);
        }).catch((error) => {
            if (error === "وب سایت با یک خطای غیر منتظره مواجه شد. لطفا بعدا دوباره تلاش کنید.") {
                appContext.handleError(t('translation:networkError'));
            } else {
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
            }
        });
    }

    const setContentTypeInContent = () => {
        contentsContext.setContent(prevState => {
            return {
                ...prevState, type: {
                    target_id: contentType
                }
            }
        });
    }

    useEffect(() => {
        getDomainSource();
    }, []);

    useEffect(() => {
        setContentTypeInContent();
    }, [contentType]);

    // console.log(content);

    return (<NewContentContext.Provider value={{
        selectedTags: selectedTags,
        setSelectedTags: setSelectedTags,
        isObjectEmpty: isObjectEmpty,
        selectedDomainAccess: selectedDomainAccess,
        setSelectedDomainAccess: setSelectedDomainAccess,
        domainAccesses: domainAccesses,
        setDomainAccesses: setDomainAccesses,
        setUnpublishDate: setUnpublishDate,
        setPublishDate: setPublishDate,
        publishDate: publishDate,
        unpublishDate: unpublishDate,
        setDescriptionFileSrc:setDescriptionFileSrc,
        descriptionFileSrc:descriptionFileSrc,
    }}>
        <Fade in={openRegisterForm} id="modal">
            <StyledDirection lang={lang}>
                <StyledCancelButton onClick={handleCloseRegisterForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <NewContentTabsComponent/>
                </ModalBody>
            </StyledDirection>
        </Fade>
    </NewContentContext.Provider>);
}

export default withNamespaces('translation,contents,tags,categories')(Index);