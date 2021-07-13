import React, {useState, useEffect} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {Typography} from "@material-ui/core"

import {StyledAddButton} from "assets/js/library/components/buttons"
import {StyledHead} from "assets/js/library/base/all"
import {StyledHeadTypography} from "assets/js/library/base/typography"
import {green} from "assets/js/library/abstracts/colors"
import Tour from "reactour"
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock"
import {steps, checkPermissionAllTypeContent} from "./Index.js"
import {get} from "libraries/local-storage";
import {StyledGreenButton} from "assets/js/library/components/buttons";

function Index({t, handleOpenContentForm, setExpandedFilter}) {
    const lang = i18next.language
    const [currentStep, setCurrentStep] = useState(1)
    const [isTourOpen, setIsTourOpen] = useState(false)
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER));
    const [allContentPer, setAllContentPer] = useState(false)

    const clicked = () => {
        setIsTourOpen(true)
        setExpandedFilter(true)
    }

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    useEffect(() => {
        checkPermissionAllTypeContent(setAllContentPer, permissions)
    }, [permissions, setAllContentPer]);

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className='content-list'>{t('contents:contentList')}</StyledHeadTypography>
        <StyledGreenButton onClick={clicked}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledGreenButton>
        <StyledAddButton
            permission={`${allContentPer}`}
            className='register-button' bg={green[0]}
            onClick={(e) => handleOpenContentForm(e, permissions.accountName)}>
            <Typography>{t('translation:registerContent')}</Typography>
        </StyledAddButton>
        <div id="tour" style={{direction: 'ltr!important'}}>
            <Tour showCloseButton={false}
                  showNavigation={false}
                  showNavigationNumber={false}
                  disableDotsNavigation={false}
                  lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                  nextButton={
                      <StyledNextButton>
                          <span>{steps.length}/{currentStep}</span>
                          {t('translation:nextStep')}
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
    </StyledHead>)
}

export default withNamespaces('contents')(Index)
