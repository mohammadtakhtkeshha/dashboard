import React, {useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import Tour from 'reactour';

import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {steps} from "./SettingsTourComponent.js";

function SettingsTourComponent({t, setIsTourOpen, isTourOpen}) {
    const [currentStep, setCurrentStep] = useState(1);

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (<Tour showCloseButton={false}
                  showNavigation={false}
                  showNavigationNumber={false}
                  disableDotsNavigation={false}
                  lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                  nextButton={<StyledNextButton>
                      <span>{steps.length}/{currentStep}</span>
                      {t('translation:nextStep')}
                  </StyledNextButton>}
                  prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
                  steps={steps}
                  customizedCloseButton={<StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
                  isOpen={isTourOpen}
                  showNumber={true}
                  startAt={0}
                  getCurrentStep={(curr) => setCurrentStep(curr + 1)}
                  onRequestClose={() => closeTour()}/>);
}

export default withNamespaces('users,translation')(SettingsTourComponent);
