import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import {StyledRegisterButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {green} from "components/partials/Colors";
import GuideBlockComponent from "../../../../partials/GuideBlockComponent";
import Tour from "reactour";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";

function Index({t, setOpenRegisterForm}) {
    const lang = i18next.language;
    const [totalStep,setTotalStep]=useState('');
    const [currentStep,setCurrentStep]=useState('');
    const [isTourOpen, setIsTourOpen] = useState(false);
    const steps = [
        {
            selector: '.register-button',
            content: ({ goTo, inDOM }) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
            stepInteraction: false,
        }, {
            selector: '.content-list',
            content: ({ goTo, inDOM }) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        },
    ];
    const clicked = () => {
        setIsTourOpen(true);
    }

    return (
        <StyledHead lang={lang}>
                <StyledHeadTypography className='content-list' >{t('contents:contentList')}</StyledHeadTypography>
            <StyledRegisterButton onClick={clicked}>
                <Typography>{t('translation:guide')}</Typography>
            </StyledRegisterButton>
                <StyledRegisterButton className='register-button' bg={green[0]} onClick={setOpenRegisterForm}>
                    <Typography>{t('translation:registerContent')}</Typography>
                </StyledRegisterButton>
            <Tour
                showCloseButton={false}
                showNavigation={false}
                showNavigationNumber={false}
                disableDotsNavigation={false}
                lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                nextButton={<StyledNextButton><span>{totalStep}/{currentStep}</span> {t('translation:nextStep')}</StyledNextButton>}
                prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
                steps={steps}
                customizedCloseButton={<StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
                isOpen={isTourOpen}
                showNumber={true}
                badgeContent={(curr, tot) => {
                    setTotalStep(tot);
                    setCurrentStep(curr);
                }}
                getCurrentStep={(curr,tot) => console.log(`The current step is ${curr + 1}=${tot}`)}
                onRequestClose={() => setIsTourOpen(false)}
            />
        </StyledHead>
    );
}

export default withNamespaces('contents')(Index);
