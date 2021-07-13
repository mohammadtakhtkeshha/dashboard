import React, {useRef, useState,useEffect} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import Tour from 'reactour'

import {Typography} from "@material-ui/core"

import {StyledAddButton,StyledGreenButton} from "assets/js/library/components/buttons"
import { StyledHead,StyledRelative} from "assets/js/library/base/all"
import { StyledHeadTypography} from "assets/js/library/base/typography"
import {steps} from "./TicketHeaderComponent.js";
import {StyledCloseGuideButton,StyledNextButton,StyledPrevButton} from "assets/js/partials/guideBlock"
import {get} from "libraries/local-storage";

function TicketHeaderComponent({t, setOpenForm,setExpandedFilter}) {
    const lang = i18next.language
    const [isTourOpen, setIsTourOpen] = useState(false)
    const [currentStep,setCurrentStep]=useState(1)
    const refRegisterButton = useRef(null)
    const refList = useRef(null)

    useEffect(() => {
        if(currentStep  >1){
            setExpandedFilter(true)
        }
    }, [currentStep,setExpandedFilter]);//currentStep

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="ticket-list" ref={refList}>{t('tickets:ticketList')}</StyledHeadTypography>
        <StyledGreenButton onClick={()=>setIsTourOpen(true)}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledGreenButton>
        <Tour
            showCloseButton={false}
            showNavigation={false}
            showNavigationNumber={false}
            disableDotsNavigation={false}
            lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
            nextButton={<StyledNextButton><span>{steps.length}/{currentStep}</span> {t('translation:nextStep')}</StyledNextButton>}
            prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
            steps={steps}
            customizedCloseButton={<StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
            isOpen={isTourOpen}
            startAt={0}
            showNumber={true}
            getCurrentStep={(curr) =>setCurrentStep(curr+1)}
            onRequestClose={() => closeTour()}
        />
        <StyledRelative>
            <StyledAddButton permission="true" className="register-button" ref={refRegisterButton} onClick={()=>{setOpenForm({show:true,id:""})}}>
                <Typography>{t('tickets:newTicket')}</Typography>
            </StyledAddButton>
        </StyledRelative>
    </StyledHead>)
}

export default withNamespaces('tickets,translation')(TicketHeaderComponent)
