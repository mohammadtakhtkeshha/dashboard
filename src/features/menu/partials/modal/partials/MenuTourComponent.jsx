import React, {useState} from "react"
import {withNamespaces} from "react-i18next"
import Tour from "reactour";

import HelpIcon from "@material-ui/icons/Help";

import {steps} from "./MenuTourComponent.js";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";


function MenuTourComponent({t}) {
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    const clicked = () => {
        setIsTourOpen(true);
    }

    return (<>
                <StyledTourButton onClick={clicked}>
                    <HelpIcon/>
                </StyledTourButton>
                <Tour showCloseButton={false}
                      showNavigation={false}
                      disableFocusLock={true}
                      showNavigationNumber={false}
                      disableDotsNavigation={false}
                      lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                      nextButton={<StyledNextButton><span>{steps.length}/{currentStep}</span> {t('translation:nextStep')}
                      </StyledNextButton>}
                      prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
                      steps={steps}
                      customizedCloseButton={
                          <StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
                      isOpen={isTourOpen}
                      showNumber={true}
                      startAt={0}
                      getCurrentStep={(curr) =>setCurrentStep(curr+1)}
                      onRequestClose={() => closeTour()}/>
    </>)
}

export default withNamespaces('translation')(MenuTourComponent)
