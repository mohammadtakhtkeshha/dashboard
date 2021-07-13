import React, {useRef, useState,useEffect} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import Tour from 'reactour'

import {Typography} from "@material-ui/core"

import { StyledHeadTypography} from "assets/js/library/base/typography";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock"
import {steps} from "./CommentHeaderComponent.js"
import {StyledHeadComment} from "assets/js/library/pages/comment/commentHeader"
import {StyledGreenButton} from "assets/js/library/components/buttons";

function CommentHeaderComponent({t, setExpandedFilter}) {
    const lang = i18next.language
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const refList = useRef(null);

    const clicked = () => {
        setExpandedFilter(true)
        setIsTourOpen(true)
    }

    useEffect(() => {
        if (currentStep > 1) {
            setExpandedFilter(true)
        }
    }, [currentStep,setExpandedFilter]);


    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (<StyledHeadComment lang={lang}>
        <StyledHeadTypography ref={refList} className="commentList">
            {t('comments:commentsList')}
        </StyledHeadTypography>
        <StyledGreenButton onClick={clicked}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledGreenButton>
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
              onRequestClose={() => closeTour()}/>
    </StyledHeadComment>)
}

export default withNamespaces('comments,translation')(CommentHeaderComponent)
