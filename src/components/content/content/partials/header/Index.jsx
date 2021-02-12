import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Typography} from "@material-ui/core";

import {StyledRegisterButton, StyledHead, StyledHeadTypography} from "assets/js/App";
import {green} from "components/partials/Colors";
import GuideBlockComponent from "components/partials/GuideBlockComponent";
import Tour from "reactour";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";

function Index({t, setOpenRegisterForm,setExpandedFilter}) {
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
        }, {
            selector: '.filter-title',
            content: ({ goTo, inDOM }) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        }, {
            selector: '.filter-status',
            content: ({ goTo, inDOM }) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        }, {
            selector: '.filter-type',
            content: ({ goTo, inDOM }) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        }
    ];
    const clicked = () => {
        setIsTourOpen(true);
    }

    const updateTour = (curr) => {
        if(curr>1){
            setExpandedFilter(true)
        }
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
                    updateTour(curr)
                }}
                getCurrentStep={(curr,tot) => console.log(`The current step is ${curr + 1}=${tot}`)}
                onRequestClose={() => setIsTourOpen(false)}
            />
        </StyledHead>
    );
}

export default withNamespaces('contents')(Index);
