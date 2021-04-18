import React, {useState} from "react"
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

function Index({t, setOpenRegisterForm, setExpandedFilter}) {
    const lang = i18next.language
    const [totalStep, setTotalStep] = useState('')
    const [currentStep, setCurrentStep] = useState('')
    const [isTourOpen, setIsTourOpen] = useState(false)
    const helpPermission = JSON.parse(get(process.env.REACT_APP_USER))

    const clicked = () => {
        setIsTourOpen(true)
    }

    const updateTour = (curr) => {
        if (curr > 1) {
            setExpandedFilter(true)
        }
    }

    return (
        <StyledHead lang={lang}>
            <StyledHeadTypography className='content-list'>{t('contents:contentList')}</StyledHeadTypography>
            <StyledHelpButton permission={helpPermission.permissions['access administration pages'].access} onClick={clicked}>
                <Typography>{t('translation:guide')}</Typography>
            </StyledHelpButton>
            <StyledAddButton className='register-button' bg={green[0]} onClick={setOpenRegisterForm}>
                <Typography>{t('translation:registerContent')}</Typography>
            </StyledAddButton>
            <div id="tour" style={{direction: 'ltr!important'}}>
                <Tour showCloseButton={false}
                      showNavigation={false}
                      showNavigationNumber={false}
                      disableDotsNavigation={false}
                      lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                      nextButton={<StyledNextButton><span>{totalStep}/{currentStep}</span> {t('translation:nextStep')}
                      </StyledNextButton>}
                      prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
                      steps={steps}
                      customizedCloseButton={
                          <StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
                      isOpen={isTourOpen}
                      showNumber={true}
                      badgeContent={(curr, tot) => {
                          setTotalStep(tot)
                          setCurrentStep(curr)
                          updateTour(curr)
                      }}
                      getCurrentStep={(curr, tot) => console.log(`The current step is ${curr + 1}=${tot}`)}
                      onRequestClose={() => setIsTourOpen(false)}
                />
            </div>
        </StyledHead>
    )
}

export default withNamespaces('contents')(Index)
