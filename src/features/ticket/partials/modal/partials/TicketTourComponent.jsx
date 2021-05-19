import React, {useState} from "react"
import {withNamespaces} from "react-i18next"

import HelpIcon from "@material-ui/icons/Help";

import Tour from "reactour";
import {steps} from "./TicketTourComponent.js"
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";

function TicketTourComponent({t,chosenDepartment}) {
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
        <StyledTourButton onClick={clicked} style={{display: chosenDepartment === "" ? 'none' : 'block'}}>
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
              getCurrentStep={(cur) => setCurrentStep(cur + 1)}
              startAt={0}
              onRequestClose={() => closeTour()}/>
    </>)
}

export default withNamespaces('translation')(TicketTourComponent)
