import React, {useState} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";
import Tour from "reactour";

import {Typography} from "@material-ui/core";

import {StyledAddButton, StyledGreenButton} from "assets/js/library/components/buttons";
import {StyledHead, StyledRelative} from "assets/js/library/base/all";
import {StyledHeadTypography} from "assets/js/library/base/typography";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {get} from "libraries/local-storage";
import {steps} from "./MenuHeaderComponent.js";

function MenuHeaderComponent({t, setOpenForm}) {
    const lang = i18next.language;
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (
        <StyledHead lang={lang}>
            <StyledHeadTypography className='menu-list'>{t("menu:menuList")}</StyledHeadTypography>
            <StyledGreenButton onClick={() => setIsTourOpen(true)}>
                <Typography>{t("translation:guide")}</Typography>
            </StyledGreenButton>
            <StyledRelative>
                <StyledAddButton
                    permission="true"
                    className='register-button'
                    onClick={() => setOpenForm({show: true, id: ""})}>
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
                nextButton={<StyledNextButton>
                    <span>{steps.length}/{currentStep}</span>
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
