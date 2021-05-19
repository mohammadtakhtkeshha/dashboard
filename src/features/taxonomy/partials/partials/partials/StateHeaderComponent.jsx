import React, {useState} from "react"
import i18next from "i18next"
import {withNamespaces} from "react-i18next"
import Tour from "reactour"

import {Typography} from "@material-ui/core"

import {StyledRelative,StyledHead} from "assets/js/library/base/all"
import {StyledHeadTypography} from "assets/js/library/base/typography"
import {StyledAddButton} from "assets/js/library/components/buttons"
import {
    StyledCloseGuideButton,
    StyledNextButton,
    StyledPrevButton
} from "assets/js/partials/guideBlock"
import {steps} from "./StateHeaderComponent.js";
import {get} from "libraries/local-storage";
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader"

function StateHeaderComponent({t, setOpenForm, type}) {
    const lang = i18next.language
    const [isTourOpen, setIsTourOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const helpPermission = JSON.parse(get(process.env.REACT_APP_USER))

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="state-list">{t(`taxonomy:${type.type}List`)}</StyledHeadTypography>
        <StyledHelpButton permission={helpPermission.permissions['access administration pages'].access} onClick={() => setIsTourOpen(true)}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledHelpButton>
        <StyledRelative>
            <StyledAddButton className="register-button" onClick={() => setOpenForm({show: true, id: ''})}>
                <Typography>{t(`taxonomy:new${type.type}`)}</Typography>
            </StyledAddButton>
        </StyledRelative>
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
              getCurrentStep={(curr) => setCurrentStep(curr+1)}
              onRequestClose={() => closeTour()}
        />
    </StyledHead>)
}

export default withNamespaces('taxonomy,translation')(StateHeaderComponent)
