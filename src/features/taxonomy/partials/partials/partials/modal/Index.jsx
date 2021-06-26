import React, {useState} from "react"
import {withNamespaces} from "react-i18next"

import {makeStyles} from "@material-ui/styles"
import {Backdrop,Box,Modal} from "@material-ui/core"
import Fade from "@material-ui/core/Fade"
import HelpIcon from "@material-ui/icons/Help";

import {modalClasses} from "assets/js/library/components/modal";
import {StyledCancelButton,ModalBody} from "assets/js/library/components/modal"
import {StyledSvg} from "assets/js/library/base/all"
import {ReactComponent as Exit} from "assets/svg/exit.svg"
import StateFormComponent from "./partials/StateFormComponent.jsx"
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";
import Tour from "reactour";
import {
    StyledCloseGuideButton,
    StyledNextButton,
    StyledPrevButton
} from "assets/js/partials/guideBlock";
import {steps} from "./Index.js"

const useStyle = makeStyles(modalClasses)

function Index({t, openForm, setOpenForm, handleCloseForm, states, errors, setErrors, category, setCategory, setStates, closeForm, getStates, type, setExpandedFilter}) {
    const classes = useStyle({maxWidth:'700px'})
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const clicked = () => {
        setIsTourOpen(true);
    }

    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openForm.show}
        onClose={handleCloseForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        <Fade in={openForm.show} id="modal">
            <Box>
                <StyledCancelButton onClick={handleCloseForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <StateFormComponent closeForm={closeForm}
                                        errors={errors}
                                        setOpenForm={setOpenForm}
                                        setStates={setStates}
                                        category={category}
                                        type={type}
                                        setCategory={setCategory}
                                        setErrors={setErrors}
                                        states={states}
                                        getStates={getStates}
                                        openForm={openForm}/>
                </ModalBody>
                <StyledTourButton onClick={clicked} show="true">
                    <HelpIcon/>
                </StyledTourButton>
                <Tour showCloseButton={false}
                      showNavigation={false}
                      disableFocusLock={true}
                      showNavigationNumber={false}
                      disableDotsNavigation={false}
                      lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                      nextButton={<StyledNextButton><span>{steps.length}/{currentStep}</span> {t('translation:nextStep')}
                      </StyledNextButton>}
                      prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
                      steps={steps}
                      customizedCloseButton={
                          <StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
                      isOpen={isTourOpen}
                      showNumber={true}
                      startAt={0}
                      getCurrentStep={(curr)=>setCurrentStep(curr+1)}
                      onRequestClose={() => closeTour()}/>
            </Box>
        </Fade>
    </Modal>)
}

export default withNamespaces('translation')(Index)
