/** @format */

import React, {useState} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";
import Tour from "reactour";

import {Typography} from "@material-ui/core";

import {StyledHead, StyledHeadTypography, StyledAddButton, StyledRelative} from "assets/js/App";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {get} from "libraries/local-storage";
import {steps} from "./MenuHeaderComponent.js";
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader";

function MenuHeaderComponent({t, setOpenForm}) {
    const lang = i18next.language;
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER));

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (
        <StyledHead lang={lang}>
            <StyledHeadTypography className='user-list'>{t("menu:menuList")}</StyledHeadTypography>
            <StyledHelpButton permission={permissions["access administration pages"].access}
                              onClick={() => setIsTourOpen(true)}>
                <Typography>{t("translation:guide")}</Typography>
            </StyledHelpButton>
            <StyledRelative>
                <StyledAddButton className='register-button' onClick={() => setOpenForm({show: true, id: ""})}>
                    <Typography>{t("menu:newMenu")}</Typography>
                </StyledAddButton>
            </StyledRelative>
            <Tour
                showCloseButton={false}
                showNavigation={false}
                showNavigationNumber={false}
                disableDotsNavigation={false}
                startAt={0}
                lastStepNextButton={<StyledCloseGuideButton>{t("translation:endGuide")}</StyledCloseGuideButton>}
                nextButton={
                    <StyledNextButton>
            <span>
              {steps.length}/{currentStep}
            </span>
                        {t("translation:nextStep")}
                    </StyledNextButton>
                }
                prevButton={<StyledPrevButton>{t("translation:prevStep")}</StyledPrevButton>}
                steps={steps}
                customizedCloseButton={<StyledCloseGuideButton>{t("translation:closeGuide")}</StyledCloseGuideButton>}
                isOpen={isTourOpen}
                showNumber={true}
                getCurrentStep={(curr) => setCurrentStep(curr)}
                onRequestClose={() => closeTour()}
            />
        </StyledHead>
    );
}

export default withNamespaces("menu,translation")(MenuHeaderComponent);
