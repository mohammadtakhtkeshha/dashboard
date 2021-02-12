import React, {useState} from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import Modal from '@material-ui/core/Modal';
import Fade from "@material-ui/core/Fade";
import HelpIcon from "@material-ui/icons/Help";

import CommentFormComponent from "./modal/CommentFormComponent.jsx";

import {
    StyledCloseGuideButton,
    StyledNextButton,
    StyledPrevButton
} from "assets/js/partials/guideBlock";
import Tour from "reactour";
import {StyledTourButton} from "assets/js/content/partials/modal/insideModal/modalForm";
import { StyledDirection, StyledSvg} from "assets/js/App";
import {StyledCancelButton} from "assets/js/content/partials/contentModal";
import {ReactComponent as Exit} from "assets/svg/exit.svg";
import {constSteps} from "./CommentModalComponent.js"
import {commentModal,StyledModalBody} from "assets/js/library/pages/comment/commentModal";
import {makeStyles} from "@material-ui/styles";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles(commentModal)

function CommentModalComponent({t, open, setOpen, publishedComments, unconfirmedComments, handlePagination, comment, setComment, commentStatus}) {
    const lang = i18next.language
    const classes = useStyles()
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [totalStep, setTotalStep] = useState('');
    const [currentStep, setCurrentStep] = useState('');
    const steps = constSteps

    // const updateTour = (curr) => {
    //     if(curr>1){
    //         setExpandedFilter(true)
    //     }
    // }
    const handleClose = () => {
        setOpen({show: false, id: ''});
    }

    const clicked = () => {
        setIsTourOpen(true);
    }

    return (<Modal aria-labelledby="transition-modal-title"
                   aria-describedby="transition-modal-description"
                   className={classes.modal}
                   open={open.show}
                   onClose={handleClose}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{timeout: 500}}>
        <Fade in={open.show} id="modal">
            <StyledDirection lang={lang}>
                <StyledCancelButton onClick={handleClose}>
                    <StyledSvg>
                        <Exit width={"40px"} height={"40px"}/>
                    </StyledSvg>
                </StyledCancelButton>
                <StyledModalBody>
                    <CommentFormComponent open={open}
                                          handlePagination={handlePagination}
                                          comment={comment}
                                          setComment={setComment}
                                          setOpen={setOpen}
                                          unconfirmedComments={unconfirmedComments}
                                          commentStatus={commentStatus}
                                          publishedComments={publishedComments}/>
                </StyledModalBody>
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
    </Modal>);

}

export default withNamespaces('translation')(CommentModalComponent);
