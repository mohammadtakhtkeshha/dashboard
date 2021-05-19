import React, {useState, useEffect} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {Typography} from "@material-ui/core"

import {StyledAddButton, StyledHead, StyledHeadTypography} from "assets/js/App"
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader";
import {green} from "assets/js/library/abstracts/colors"
import Tour from "reactour"
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock"
import {steps} from "./Index.js"
import {get} from "libraries/local-storage";

function Index({t, handleOpenContentForm, setExpandedFilter}) {
    const lang = i18next.language
    const [currentStep, setCurrentStep] = useState(1)
    const [isTourOpen, setIsTourOpen] = useState(false)
    const helpPermission = JSON.parse(get(process.env.REACT_APP_USER))

    const clicked = () => {
        setIsTourOpen(true)
    }
    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    useEffect(() => {
        if (currentStep > 1) {
            setExpandedFilter(true)
        }
    }, [currentStep,setExpandedFilter]);

    return (
        <StyledHead lang={lang}>
            <StyledHeadTypography className='content-list'>{t('contents:contentList')}</StyledHeadTypography>
            <StyledHelpButton permission={helpPermission.permissions['access administration pages'].access}
                              onClick={clicked}>
                <Typography>{t('translation:guide')}</Typography>
            </StyledHelpButton>
            <StyledAddButton className='register-button' bg={green[0]} onClick={(e)=>handleOpenContentForm(e,helpPermission.accountName)}>
                <Typography>{t('translation:registerContent')}</Typography>
            </StyledAddButton>
            <div id="tour" style={{direction: 'ltr!important'}}>
                <Tour showCloseButton={false}
                      showNavigation={false}
                      showNavigationNumber={false}
                      disableDotsNavigation={false}
                      lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                      nextButton={
                          <StyledNextButton><span>{steps.length}/{currentStep}</span> {t('translation:nextStep')}
                          </StyledNextButton>}
                      prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
                      steps={steps}
                      customizedCloseButton={
                          <StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
                      isOpen={isTourOpen}
                      showNumber={true}
                      startAt={0}
                      getCurrentStep={(curr) => setCurrentStep(curr + 1)}
                      onRequestClose={closeTour}
                />
            </div>
        </StyledHead>
    )
}

export default withNamespaces('contents')(Index)
