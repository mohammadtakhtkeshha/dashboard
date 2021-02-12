import React, {useState} from "react"
import {withNamespaces} from "react-i18next"
import i18next from "i18next"
import Tour from "reactour";

import {makeStyles} from "@material-ui/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import HelpIcon from "@material-ui/icons/Help";

import {useStyles} from "assets/js/user/users"
import {ModalBody, StyledDirection, StyledSvg} from "assets/js/App"
import {StyledCancelButton} from "assets/js/content/partials/contentModal"
import {ReactComponent as Exit} from "assets/svg/exit.svg"
import MenuFormComponent from "./partials/MenuFormComponent.jsx"
import {constSteps} from "./Index.js";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";

const useStyle = makeStyles(useStyles)

function Index({t, openForm, setOpenForm, menus, errors, setErrors, menu, setMenu, getMenus, handlePagination, closeForm, link, setLink}) {
    let lang = i18next.language
    const classes = useStyle()
    const [steps, setSteps] = useState(constSteps);
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
        open={openForm.show}
        onClose={closeForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        <Fade in={openForm.show} id="modal">
            <StyledDirection lang={lang}>
                <StyledCancelButton onClick={closeForm}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <ModalBody>
                    <MenuFormComponent closeForm={closeForm}
                                       errors={errors}
                                       handlePagination={handlePagination}
                                       setOpenForm={setOpenForm}
                                       link={link}
                                       setLink={setLink}
                                       getMenus={getMenus}
                                       menu={menu}
                                       setMenu={setMenu}
                                       setErrors={setErrors} menus={menus} openForm={openForm}/>
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
                          setTotalStep(tot);
                          setCurrentStep(curr);
                          // updateTour(curr, tot)
                      }}
                    // getCurrentStep={(curr) =>updateTour(curr)}
                      onRequestClose={() => setIsTourOpen(false)}/>
            </StyledDirection>
        </Fade>
    </Modal>)
}

export default withNamespaces('translation')(Index)
