import React, {useState} from "react"
import Backdrop from "@material-ui/core/Backdrop";
import {Box, Fade, Modal} from "@material-ui/core";
import {ModalBody, StyledCancelButton} from "../../../../../../../../assets/js/library/components/modal";
import {StyledSvg} from "../../../../../../../../assets/js/library/base/all";
import {ReactComponent as Exit} from "../../../../../../../../assets/svg/exit.svg";
import RoleFormComponent from "../../../../../../../user/partials/roles/partials/modal/partials/RoleFormComponent";
import {StyledTourButton} from "../../../../../../../../assets/js/content/partials/modal/insideModal/modalForm";
import HelpIcon from "@material-ui/icons/Help";
import Tour from "reactour";
import {
    StyledCloseGuideButton,
    StyledNextButton,
    StyledPrevButton
} from "assets/js/partials/guideBlock";
import {makeStyles} from "@material-ui/styles";
import {roleModal} from "assets/js/library/pages/user/rolesModal";
import {withNamespaces} from "react-i18next";
import ElementSettingsFormComponent from "./partials/ElementSettingsFormComponent";

const useStyles = makeStyles(roleModal)

function ElementSettingsModalComponent({t, handleClose, openForm, setOpenForm, setEmail}) {
    const classes = useStyles();
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState(1);

    const clicked = () => {
        setIsTourOpen(true);
    }
    const closeTour = () => {
        setIsTourOpen(false)
        setCurrentStep(1)
    }

    return (<Modal aria-labelledby="transition-modal-title"
                   aria-describedby="transition-modal-description"
                   className={classes.modal}
                   open={openForm.show}
                   onClose={handleClose}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{timeout: 500}}>
        <Fade in={openForm.show} id="modal">
            <Box>
                <StyledCancelButton onClick={handleClose}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <ElementSettingsFormComponent/>
                </ModalBody>
                <StyledTourButton show="true" onClick={clicked}>
                    <HelpIcon/>
                </StyledTourButton>
                <Tour showCloseButton={false}
                      showNavigation={false}
                      showNavigationNumber={false}
                      disableDotsNavigation={false}
                      lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                      nextButton={<StyledNextButton>
                              <span>{steps.length}/{currentStep}</span>
                              {t('translation:nextStep')}
                          </StyledNextButton>}
                      prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
                      steps={steps}
                      customizedCloseButton={
                          <StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
                      isOpen={isTourOpen}
                      showNumber={true}
                      startAt={0}
                      getCurrentStep={(curr) => setCurrentStep(curr + 1)}
                      onRequestClose={closeTour}/>
            </Box>
        </Fade>
    </Modal>)
}

export default withNamespaces('translation')(ElementSettingsModalComponent);


