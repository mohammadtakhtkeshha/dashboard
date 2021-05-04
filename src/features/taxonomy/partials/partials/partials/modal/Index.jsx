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
import {constSteps} from "./Index.js"

const useStyle = makeStyles(modalClasses)

function Index({t, openForm, setOpenForm, handleCloseForm, states, errors, setErrors, category, setCategory, setStates, closeForm, getStates, type, setExpandedFilter}) {
    const classes = useStyle({maxWidth:'700px'})
    const steps = constSteps;
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [totalStep, setTotalStep] = useState('');
    const [currentStep, setCurrentStep] = useState('');

    const clicked = () => {
        setIsTourOpen(true);
    }

    const getTotalAndCurrentStep = (curr,tot) => {
        setTotalStep(tot);
        setCurrentStep(curr);
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
                <StyledTourButton onClick={clicked}>
                    <HelpIcon/>
                </StyledTourButton>
                <Tour showCloseButton={false}
                      showNavigation={false}
                      disableFocusLock={true}
                      showNavigationNumber={false}
                      disableDotsNavigation={false}
                      lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                      nextButton={<StyledNextButton><span>{totalStep}/{currentStep}</span> {t('translation:nextStep')}
                      </StyledNextButton>}
                      prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
                      steps={steps}
                      customizedCloseButton={
                          <StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
                      isOpen={isTourOpen}
                      showNumber={true}
                      badgeContent={(curr, tot) => {
                          // setTotalStep(tot);
                          // setCurrentStep(curr);
                          // updateTour(curr, tot)
                          getTotalAndCurrentStep(curr,tot)
                      }}
                    // getCurrentStep={(curr) =>updateTour(curr)}
                      onRequestClose={() => setIsTourOpen(false)}/>
            </Box>
        </Fade>
    </Modal>)
}

export default withNamespaces('translation')(Index)
