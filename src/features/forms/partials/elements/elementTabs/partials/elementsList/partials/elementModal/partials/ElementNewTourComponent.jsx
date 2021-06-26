import React, {useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import Tour from 'reactour';

import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {stepsWithOptions, stepsNoOptions} from "./ElementNewTourComponent.js";

function ElementNewTourComponent({t, setExpandedFilter, setIsTourOpen, isTourOpen, element}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [steps,setSteps] = useState(stepsNoOptions);

    useEffect(() => {
        if (element?.field_type === 'radios' || element?.field_type === 'checkboxes' || element?.field_type === 'select') {
            setSteps(stepsWithOptions)
        } else {
            setSteps(stepsNoOptions)
        }
    }, [element]);

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (<Tour showCloseButton={false}
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
                  getCurrentStep={(curr) => setCurrentStep(curr + 1)}
                  onRequestClose={() => closeTour()}/>);
}

export default withNamespaces('users,translation')(ElementNewTourComponent);
