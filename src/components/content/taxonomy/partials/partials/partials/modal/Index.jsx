import React, {useState} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"

import {makeStyles} from "@material-ui/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import HelpIcon from "@material-ui/icons/Help";

import {useStyles} from "assets/js/user/users"
import {ModalBody, StyledDirection, StyledSvg} from "assets/js/App"
import {StyledCancelButton} from "assets/js/content/partials/contentModal"
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

const useStyle = makeStyles(useStyles)

function Index({t, openForm, setOpenForm, handleCloseForm, states, errors, setErrors, category, setCategory, setStates, closeForm, getStates, type, setExpandedFilter}) {
    let lang = i18next.language
    const classes = useStyle()
    const [steps, setSteps] = useState(constSteps);
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
            <StyledDirection lang={lang}>
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
            </StyledDirection>
        </Fade>
    </Modal>)
}

export default withNamespaces('translation')(Index)
