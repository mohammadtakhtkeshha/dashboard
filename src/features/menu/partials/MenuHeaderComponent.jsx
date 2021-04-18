import React, {useState} from "react"
import i18next from "i18next"
import {withNamespaces} from "react-i18next"
import Tour from "reactour"

import {Typography} from "@material-ui/core"

import {StyledHead, StyledHeadTypography, StyledAddButton, StyledRelative} from "assets/js/App"
import {
    StyledCloseGuideButton,
    StyledNextButton,
    StyledPrevButton
} from "assets/js/partials/guideBlock"
import {get} from "libraries/local-storage"
import {steps} from "./MenuHeaderComponent.js"
import {StyledHelpButton} from "assets/js/library/pages/content/contentHeader"

function MenuHeaderComponent({t,setOpenForm}) {
    const lang = i18next.language
    const [isTourOpen, setIsTourOpen] = useState(false)
    const [totalStep,setTotalStep]=useState('')
    const [currentStep,setCurrentStep]=useState('')
    const helpPermission = JSON.parse(get(process.env.REACT_APP_USER))

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="user-list" >{t('menu:menuList')}</StyledHeadTypography>
        <StyledHelpButton  permission={helpPermission.permissions['access administration pages'].access}  onClick={()=>setIsTourOpen(true)}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledHelpButton>
        <StyledRelative>
            <StyledAddButton className="register-button" onClick={() => setOpenForm({show: true, id: ''})}>
                <Typography>{t('menu:newMenu')}</Typography>
            </StyledAddButton>
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

export default withNamespaces('menu,translation')(MenuHeaderComponent)
