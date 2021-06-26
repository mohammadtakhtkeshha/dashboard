import React, {useRef, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import Tour from 'reactour';

import {Typography} from "@material-ui/core";

import {StyledAddButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {StyledRelative} from "assets/js/App";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {steps} from "./RoleHeaderComponent.js";
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader"
import {get} from "libraries/local-storage";

function Index({t, setOpenForm}) {
    const lang = i18next.language;
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const refRegisterButton = useRef(null);
    const refList = useRef(null);
    const helpPermission = JSON.parse(get(process.env.REACT_APP_USER))

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="role-list" ref={refList}>{t('roles:roleList')}</StyledHeadTypography>
        <StyledHelpButton permission={helpPermission.permissions['access administration pages'].access} onClick={()=>setIsTourOpen(true)}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledHelpButton>
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
              getCurrentStep={(curr) => setCurrentStep(curr)}
              onRequestClose={() => closeTour()}/>
        <StyledRelative>
            <StyledAddButton className="register-button"
                                  ref={refRegisterButton}
                                  onClick={() => setOpenForm({show: true, id: ''})}>
                <Typography>{t('roles:newRole')}</Typography>
            </StyledAddButton>
        </StyledRelative>
    </StyledHead>);
}

export default withNamespaces('roles,translation')(Index);
