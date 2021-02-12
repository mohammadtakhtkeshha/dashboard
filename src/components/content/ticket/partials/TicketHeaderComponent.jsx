import React, {useRef, useState} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import Tour from 'reactour'

import {Typography} from "@material-ui/core"

import {StyledRegisterButton, StyledHead, StyledHeadTypography} from "assets/js/App"
import {StyledRelative} from "assets/js/App"
import GuideBlockComponent from "components/partials/GuideBlockComponent"
import {StyledCloseGuideButton,StyledNextButton,StyledPrevButton} from "assets/js/partials/guideBlock"

function TicketHeaderComponent({t, setOpenForm,setExpandedFilter}) {
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
        }, {
            selector: '.tour-status',
            content: ({ goTo, inDOM }) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        }, {
            selector: '.tour-department',
            content: ({ goTo, inDOM }) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        }, {
            selector: '.tour-subject',
            content: ({ goTo, inDOM }) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        }
    ]
    const refRegisterButton = useRef(null)
    const refList = useRef(null)

    const clicked = () => {
        setIsTourOpen({show:true,id:""})
    }
    const updateTour = (curr) => {
        if(curr>1){
            setExpandedFilter(true)
        }
    }
    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="user-list" ref={refList}>{t('tickets:ticketList')}</StyledHeadTypography>
        <StyledRegisterButton onClick={clicked}>
            <Typography>{t('translation:guide')}</Typography>
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
                setTotalStep(tot)
                setCurrentStep(curr)
                updateTour(curr)
            }}
            getCurrentStep={(curr,tot) => console.log(`The current step is ${curr + 1}=${tot}`)}
            onRequestClose={() => setIsTourOpen(false)}
        />
        <StyledRelative>
            <StyledRegisterButton className="register-button" ref={refRegisterButton} onClick={()=>{setOpenForm({show:true,id:""})}}>
                <Typography>{t('tickets:newTicket')}</Typography>
            </StyledRegisterButton>
        </StyledRelative>
    </StyledHead>)
}

export default withNamespaces('tickets,translation')(TicketHeaderComponent)
