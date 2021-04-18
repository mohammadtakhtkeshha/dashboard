import React, {useRef, useState} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import Tour from 'reactour'

import {Typography} from "@material-ui/core"

import { StyledHeadTypography} from "assets/js/App"
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock"
import {steps} from "./CommentHeaderComponent.js"
import {StyledHeadComment} from "assets/js/library/pages/comment/commentHeader"
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader"
import {get} from "libraries/local-storage"

function CommentHeaderComponent({t, setExpandedFilter}) {
    const lang = i18next.language
    const [isTourOpen, setIsTourOpen] = useState(false)
    const [totalStep, setTotalStep] = useState('')
    const [currentStep, setCurrentStep] = useState('')
    const refList = useRef(null)
    const helpPermission = JSON.parse(get(process.env.REACT_APP_USER))

    const clicked = () => {
        setExpandedFilter(true)
        setIsTourOpen(true)
    }

    const updateTour = (curr) => {
        if (curr > 1) {
            setExpandedFilter(true)
        }
    }

    return (<StyledHeadComment lang={lang}>
        <StyledHeadTypography className="user-list" ref={refList}>{t('comments:commentsList')}</StyledHeadTypography>
        <StyledHelpButton permission={helpPermission.permissions['access administration pages'].access}  onClick={clicked}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledHelpButton>
        <Tour showCloseButton={false}
              showNavigation={false}
              showNavigationNumber={false}
              disableDotsNavigation={false}
              lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
              nextButton={<StyledNextButton><span>{totalStep}/{currentStep}</span> {t('translation:nextStep')}
              </StyledNextButton>}
              prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
              steps={steps}
              customizedCloseButton={<StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
              isOpen={isTourOpen}
              showNumber={true}
              badgeContent={(curr, tot) => {
                  setTotalStep(tot)
                  setCurrentStep(curr)
                  updateTour(curr)
              }}
              getCurrentStep={(curr, tot) => console.log(`The current step is ${curr + 1}=${tot}`)}
              onRequestClose={() => setIsTourOpen(false)}/>
    </StyledHeadComment>)
}

export default withNamespaces('comments,translation')(CommentHeaderComponent)
