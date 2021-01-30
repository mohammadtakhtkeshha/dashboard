import React, {useState} from "react"
import i18next from "i18next"
import {withNamespaces} from "react-i18next"

import {Typography} from "@material-ui/core"

import {StyledHead, StyledHeadTypography, StyledRegisterButton, StyledRelative} from "assets/js/App"
import Tour from "reactour"
import {
    StyledCloseGuideButton,
    StyledNextButton,
    StyledPrevButton
} from "assets/js/partials/guideBlock"
import GuideBlockComponent from "../../../../../partials/GuideBlockComponent"


function StateHeaderComponent({t,setOpenForm}) {
    const lang = i18next.language
    const [isTourOpen, setIsTourOpen] = useState(false)
    const [totalStep,setTotalStep]=useState('')
    const [currentStep,setCurrentStep]=useState('')
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
            selector: '.user-list',
            content: ({ goTo, inDOM }) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        },
    ]

    const registerButtonClick = () => {

    }

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="user-list" >{t('taxonomy:statesList')}</StyledHeadTypography>
        <StyledRegisterButton onClick={()=>setIsTourOpen(true)}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledRegisterButton>
        <StyledRelative>
            <StyledRegisterButton className="register-button" onClick={() => setOpenForm({show: true, id: ''})}>
                <Typography>{t('taxonomy:newState')}</Typography>
            </StyledRegisterButton>
        </StyledRelative>
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
                setTotalStep(tot)
                setCurrentStep(curr)
            }}
            getCurrentStep={(curr,tot) => console.log(`The current step is ${curr + 1}=${tot}`)}
            onRequestClose={() => setIsTourOpen(false)}
        />
    </StyledHead>)
}

export default withNamespaces('taxonomy,translation')(StateHeaderComponent)
