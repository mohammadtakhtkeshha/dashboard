import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {makeStyles} from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import NewUserComponent from "./partials/NewUserComponent.jsx";
import {useStyles} from "assets/js/user/users";
import {ModalBody, StyledDirection, StyledSvg} from "assets/js/App";
import {StyledCancelButton} from "assets/js/content/partials/contentModal";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import Tour from "reactour";
import {StyledCloseGuideButton, StyledNextButton, StyledPrevButton} from "assets/js/partials/guideBlock";
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";
import HelpIcon from "@material-ui/icons/Help";
import GuideBlockComponent from "components/partials/GuideBlockComponent";

const useStyle = makeStyles(useStyles);

function Index({t, openUserForm, userMailList, userNameList,errors,setErrors,user,setUser,closeForm,getEditedUser,getRegisteredUser}) {
    let lang = i18next.language;
    const classes = useStyle();
    const [steps, setSteps] = useState([
        {
            selector: '.first-name',
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
            stepInteraction: false,
        }, {
            selector: '.last-name',
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        }, {
            selector: '.username',
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        }, {
            selector: '.my-role',
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
        },{
            selector: '.email',
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
            stepInteraction: false,
        },{
            selector: '.password',
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
            stepInteraction: false,
        },{
            selector: '.confirm-pass',
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
            stepInteraction: false,
        },{
            selector: '.status',
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
            stepInteraction: false,
        },{
            selector: '.image-upload-block',
            content: ({goTo, inDOM}) => (
                <div>
                    <GuideBlockComponent/>
                </div>
            ),
            position: 'top',
            stepInteraction: false,
        }
    ]);
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
                    <StyledDirection lang={lang}>
                        <StyledCancelButton onClick={closeForm}>
                            <StyledSvg>
                                <Exit width={"40px"} height={"40px"}/>
                            </StyledSvg>
                        </StyledCancelButton>
                        <ModalBody>
                            <NewUserComponent
                                user={user}
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
                              steps={steps}
                              customizedCloseButton={<StyledCloseGuideButton>{t('translation:closeGuide')}</StyledCloseGuideButton>}
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
            </Modal>);
}

export default withNamespaces('translation')(Index);
