import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {makeStyles} from "@material-ui/styles";
import {Modal,Box,Fade} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import HelpIcon from "@material-ui/icons/Help";

import NewUserComponent from "./partials/NewUserComponent.jsx";
import {useStyles} from "assets/js/user/users";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import Tour from "reactour";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";
import {constSteps} from "./Index.js";
import {StyledCancelButton,ModalBody} from "assets/js/library/components/modal"
import {StyledSvg, StyledHead} from "assets/js/library/base/all"
import {modalClasses} from "assets/js/library/components/modal";

const useStyle = makeStyles(modalClasses);

function Index({t, openUserForm, userMailList, userNameList, errors, setErrors, user, setUser, closeForm, getEditedUser, getRegisteredUser}) {
    let lang = i18next.language;
    const classes = useStyle({maxWidth:'700px'});
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [totalStep, setTotalStep] = useState('');
    const [currentStep, setCurrentStep] = useState('');

    const clicked = () => {
        setIsTourOpen(true);
    }

    return (<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openUserForm.show}
        onClose={closeForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        <Fade in={openUserForm.show} id="modal">
            <Box>
                <StyledCancelButton onClick={closeForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <NewUserComponent user={user}
                                      setUser={setUser}
                                      closeForm={closeForm}
                                      getEditedUser={getEditedUser}
                                      getRegisteredUser={getRegisteredUser}
                                      errors={errors}
                                      setErrors={setErrors}
                                      userNameList={userNameList}
                                      userMailList={userMailList}
                                      id={openUserForm.id}/>
                </ModalBody>
                <StyledTourButton onClick={clicked}>
                    <HelpIcon/>
                </StyledTourButton>
                <Tour showCloseButton={false}
                      showNavigation={false}
                      showNavigationNumber={false}
                      disableDotsNavigation={false}
                      lastStepNextButton={<StyledCloseGuideButton>{t('translation:endGuide')}</StyledCloseGuideButton>}
                      nextButton={<StyledNextButton><span>{totalStep}/{currentStep}</span> {t('translation:nextStep')}
                      </StyledNextButton>}
                      prevButton={<StyledPrevButton>{t('translation:prevStep')}</StyledPrevButton>}
                      steps={constSteps}
                      customizedCloseButton={
                          <StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
                      isOpen={isTourOpen}
                      showNumber={true}
                      badgeContent={(curr, tot) => {
                          setTotalStep(tot);
                          setCurrentStep(curr);
                      }}
                      onRequestClose={() => setIsTourOpen(false)}/>
            </Box>
        </Fade>
    </Modal>);
}

export default withNamespaces('translation')(Index);
