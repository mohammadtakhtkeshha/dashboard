import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import Fade from "@material-ui/core/Fade";

import contentService from "core/services/content.service";
import NewContentContext from "contexts/NewContentContext";
import {ModalBody, StyledCancelButton} from "assets/js/content/partials/contentModal";
import {StyledDirection, StyledSvg} from "assets/js/App";
import ContentsContext from "contexts/ContentsContext";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import NewContentTabsComponent from "./tabContents/index.jsx";

function Index({t, contentType, openRegisterForm, handleCloseRegisterForm}) {
    const lang = i18next.language;
    const contentsContext = useContext(ContentsContext);
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

    const setContentTypeInContent = () => {
        contentsContext.setContent(prevState => {
            return {
                ...prevState, type: {
                    target_id: contentType
                }
            }
        });
    }

    const setErrorIfTitleIsEmpty = () => {
        if(contentsContext.content.title !== ""){
            contentsContext.setErrors(prevState => {
                delete prevState['title'];
                return{
                    ...prevState
                }
            });
        }
    }

    useEffect(() => {
        getDomainSource();
    }, []);

    useEffect(() => {
        setContentTypeInContent();
    }, [contentType]);

    useEffect(() => {
            setErrorIfTitleIsEmpty();
    }, [contentsContext.content.title]);

    return (<NewContentContext.Provider value={{
        selectedTags: selectedTags,
        setSelectedTags: setSelectedTags,
        isObjectEmpty: isObjectEmpty,
        selectedDomainAccess: selectedDomainAccess,
        setSelectedDomainAccess: setSelectedDomainAccess,
        domainAccesses: domainAccesses,
        setDomainAccesses: setDomainAccesses,
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
