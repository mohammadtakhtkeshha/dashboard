import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import Fade from "@material-ui/core/Fade";
import HelpIcon from '@material-ui/icons/Help';

import contentService from "core/services/content.service";
import NewContentContext from "contexts/NewContentContext";
import {StyledCancelButton} from "assets/js/content/partials/contentModal";
import {ModalBody, StyledDirection, StyledSvg} from "assets/js/App";
import ContentsContext from "contexts/ContentsContext";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import NewContentTabsComponent from "./contentTabs/ContentTabs.jsx";
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";
import AppContext from "contexts/AppContext";
import GuideBlockComponent from "components/partials/GuideBlockComponent";
import {handleContentStepsMethod, updateTourMethod} from "./Index.js"
import {
    StyledCloseGuideButton,
    StyledNextButton,
    StyledPrevButton
} from "assets/js/partials/guideBlock";
import Tour from "reactour";

function Index({t, openRegisterForm, handleCloseRegisterForm, newsCategory, states}) {
    const lang = i18next.language;
    const contentsContext = useContext(ContentsContext);
    const [value, setValue] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [domainAccesses, setDomainAccesses] = useState([]);
    const [selectedDomainAccess, setSelectedDomainAccess] = useState([]);
    const [descriptionFileSrc, setDescriptionFileSrc] = useState('');
    const [tags, setTags] = useState([]);
    const [totalStep, setTotalStep] = useState('');
    const [currentStep, setCurrentStep] = useState('');
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [steps, setSteps] = useState([]);

    const clicked = () => {
        setIsTourOpen(true);
    }

    const appContext = useContext(AppContext);

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

    const getTags = () => {
        // appContext.setLoading(true);
        contentService.getTags(appContext.handleError).then((response) => {
            appContext.setLoading(false);
            setTags(response.data)
        });
    }

    useEffect(() => {
        getDomainSource();
        getTags();

    }, [])

    const updateTour = (curr, tot) => {
        updateTourMethod(contentsContext, setValue, curr)
    }

    const handleContentSteps = (contentType) => {
        handleContentStepsMethod(contentType, setSteps)
    }

    useEffect(() => {
        handleContentSteps(contentsContext.contentType);
    }, [contentsContext.contentType]);

    return (<NewContentContext.Provider value={{
        selectedTags: selectedTags,
        setSelectedTags: setSelectedTags,
        isObjectEmpty: isObjectEmpty,
        selectedDomainAccess: selectedDomainAccess,
        setSelectedDomainAccess: setSelectedDomainAccess,
        domainAccesses: domainAccesses,
        setDomainAccesses: setDomainAccesses,
        setDescriptionFileSrc: setDescriptionFileSrc,
        descriptionFileSrc: descriptionFileSrc,
        tags: tags
    }}>
        <Fade in={openRegisterForm} id="modal">
            <StyledDirection lang={lang}>
                <StyledCancelButton onClick={handleCloseRegisterForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <NewContentTabsComponent value={value}
                                             setValue={setValue}
                                             states={states}
                                             newsCategory={newsCategory}/>
                </ModalBody>
                <StyledTourButton onClick={clicked}>
                    <HelpIcon/>
                </StyledTourButton>
            </StyledDirection>
        </Fade>
        <Tour showCloseButton={false}
              showNavigation={false}
              showNavigationNumber={false}
              disableDotsNavigation={false}
              lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
              nextButton={<StyledNextButton><span>{totalStep}/{currentStep}</span> {t('translation:nextStep')}
              </StyledNextButton>}
              prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
              steps={steps}
              customizedCloseButton={<StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
              isOpen={isTourOpen}
              showNumber={true}
              badgeContent={(curr, tot) => {
                  setTotalStep(tot);
                  setCurrentStep(curr);
                  updateTour(curr, tot)
              }}
              onRequestClose={() => setIsTourOpen(false)}
        />
    </NewContentContext.Provider>);
}

export default withNamespaces('translation,contents,tags,categories')(Index)
