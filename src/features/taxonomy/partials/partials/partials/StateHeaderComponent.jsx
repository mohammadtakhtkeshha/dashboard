import React, {useState, useEffect} from "react"
import i18next from "i18next"
import {withNamespaces} from "react-i18next"
import Tour from "reactour"

import {Typography} from "@material-ui/core"

import {StyledRelative, StyledHead} from "assets/js/library/base/all"
import {StyledHeadTypography} from "assets/js/library/base/typography"
import {StyledAddButton, StyledGreenButton} from "assets/js/library/components/buttons"
import {
    StyledCloseGuideButton,
    StyledNextButton,
    StyledPrevButton
} from "assets/js/partials/guideBlock"
import {steps} from "./StateHeaderComponent.js";
import {get} from "libraries/local-storage";

function StateHeaderComponent({t, setOpenForm, type}) {
    const lang = i18next.language
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const {permissions} = JSON.parse(get(process.env.REACT_APP_USER));
    const [currentPermission, setCurrentPermission] = useState('');

    useEffect(() => {
        switch (type.type) {
            case 'tags':
                setCurrentPermission(`${permissions[`create terms in tags`].access}`)
                break;
            case 'category':
                setCurrentPermission(`${permissions[`create terms in category`].access}`)
                break;
            case 'images_category':
                setCurrentPermission(`${permissions[`create terms in images_category`].access}`)
                break;
            case 'sounds_category':
                setCurrentPermission(`${permissions[`create terms in sounds_category`].access}`)
                break;
            case 'videos_category':
                setCurrentPermission(`${permissions[`create terms in videos_category`].access}`)
                break;
            default:
                setCurrentPermission(`${permissions[`create terms in state`].access}`)
        }
    }, []);


    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (<StyledHead lang={lang}>
        <StyledHeadTypography className="state-list">{t(`taxonomy:${type.type}List`)}</StyledHeadTypography>
        <StyledGreenButton onClick={() => setIsTourOpen(true)}>
            <Typography>{t('translation:guide')}</Typography>
        </StyledGreenButton>
        <StyledRelative>
            <StyledAddButton
                permission={`${currentPermission}`}
                className="register-button" onClick={() => setOpenForm({show: true, id: ''})}>
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
              getCurrentStep={(curr) => setCurrentStep(curr + 1)}
              onRequestClose={() => closeTour()}
        />
    </StyledHead>)
}

export default withNamespaces('taxonomy,translation')(StateHeaderComponent)
