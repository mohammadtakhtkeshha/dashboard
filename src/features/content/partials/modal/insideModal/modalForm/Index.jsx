import React, {useContext, useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";

import {Fade,Box} from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help';

import NewContentContext from "contexts/NewContentContext";
import {StyledCancelButton} from "assets/js/library/components/modal";
import {ModalBody, StyledSvg} from "assets/js/App";
import ContentsContext from "contexts/ContentsContext";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import NewContentTabsComponent from "./contentTabs/ContentTabs.jsx";
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";
import {handleContentStepsMethod, updateTourMethod} from "./Index.js"
import {
    StyledCloseGuideButton,
    StyledNextButton,
    StyledPrevButton
} from "assets/js/partials/guideBlock";
import Tour from "reactour";

function Index({t, openRegisterForm, handleCloseRegisterForm, newsCategory, states}) {
    const contentsContext = useContext(ContentsContext);
    const [value, setValue] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [domainAccesses, setDomainAccesses] = useState([]);
    const [selectedDomainAccess, setSelectedDomainAccess] = useState([]);
    const [descriptionFileSrc, setDescriptionFileSrc] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [steps, setSteps] = useState([]);

    const clicked = () => {
        setIsTourOpen(true);
    }

    const isObjectEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    // const updateTour = (curr, tot) => {
    //     updateTourMethod(contentsContext, setValue, curr)
    // }

    useEffect(() => {
        updateTourMethod(contentsContext.contentType, setValue, currentStep)
    }, [contentsContext.contentType,currentStep,setValue]);//contentsContext.contentType

    useEffect(() => {
        handleContentStepsMethod(contentsContext.contentType, setSteps)
    }, [contentsContext.contentType,setSteps]);//contentsContext.contentType

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

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
    }}>
        <Fade in={openRegisterForm} id="modal">
            <Box>
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
                <StyledTourButton onClick={clicked} show="true">
                    <HelpIcon/>
                </StyledTourButton>
            </Box>
        </Fade>
        <Tour showCloseButton={false}
              showNavigation={false}
              showNavigationNumber={false}
              disableDotsNavigation={false}
              lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
              nextButton={<StyledNextButton><span>{steps.length}/{currentStep}</span> {t('translation:nextStep')}
              </StyledNextButton>}
              prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
              steps={steps}
              customizedCloseButton={<StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
              isOpen={isTourOpen}
              showNumber={true}
              startAt={0}
              getCurrentStep={(curr) =>setCurrentStep(curr+1)}
              onRequestClose={() => closeTour()}
        />
    </NewContentContext.Provider>);
}

export default withNamespaces('translation,contents,tags,categories')(Index)
