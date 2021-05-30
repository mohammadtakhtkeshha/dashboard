import React, {useRef, useState} from 'react';
import {withNamespaces} from 'react-i18next';

import {makeStyles} from '@material-ui/styles';
import {Modal, Box, Fade} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import HelpIcon from '@material-ui/icons/Help';

import NewWebformComponent from './partials/NewWebformComponent.jsx';
import {ReactComponent as Exit} from 'assets/svg/exit.svg';
import TourNewUser from './partials/TourNewUser.jsx';
import {StyledTourButton} from 'assets/js/content/partials/modal/insideModal/modalForm';
import {StyledCancelButton, ModalBody} from 'assets/js/library/components/modal';
import {StyledSvg} from 'assets/js/library/base/all';
import {modalClasses} from 'assets/js/library/components/modal';

const useStyle = makeStyles(modalClasses);

function Index({openWebform,errors,setErrors,closeForm,setElement}) {
    const topNode = useRef(null);
    const classes = useStyle({maxWidth: '700px'});
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [webform, setWebform] = useState({
        "machin_name": "dashform11",
        "description": "توضیح فرم",
        "title": "110فرم برای تست داشبورد"
    });

    const clicked = () => {
        setIsTourOpen(true);
    };



    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openWebform}
            onClose={closeForm}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}>
            <Fade in={openWebform} id="modal">
                <Box>
                    <StyledCancelButton onClick={closeForm}>
                        <StyledSvg>
                            <Exit width={'40px'} height={'40px'}/>
                        </StyledSvg>
                    </StyledCancelButton>
                    <ModalBody>
                        <NewWebformComponent
                            closeForm={closeForm}
                            errors={errors}
                            setErrors={setErrors}
                            setElement={setElement}
                            webform={webform}
                            setWebform={setWebform}
                        />
                    </ModalBody>
                    <StyledTourButton onClick={clicked} ref={topNode}>
                        <HelpIcon/>
                    </StyledTourButton>
                    <TourNewUser setIsTourOpen={setIsTourOpen} isTourOpen={isTourOpen}/>
                </Box>
            </Fade>
        </Modal>
    );
}

export default withNamespaces('translation')(Index);
