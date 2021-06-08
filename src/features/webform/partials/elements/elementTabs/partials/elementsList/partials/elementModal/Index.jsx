import React, {useState} from 'react';
import {withNamespaces} from 'react-i18next';

import {makeStyles} from '@material-ui/styles';
import {Modal, Box, Fade} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import HelpIcon from '@material-ui/icons/Help';

import {ReactComponent as Exit} from 'assets/svg/exit.svg';
import {StyledTourButton} from 'assets/js/content/partials/modal/insideModal/modalForm';
import {StyledCancelButton, ModalBody} from 'assets/js/library/components/modal';
import {StyledSvg} from 'assets/js/library/base/all';
import {modalClasses} from 'assets/js/library/components/modal';
import ElementTourComponent from "../elementHeader/partials/ElementTourComponent.jsx";
import NewElementComponent from "./partials/NewElementComponent.jsx";
import ElementTypeListComponent from "./partials/ElementTypeListComponent.jsx";

const useStyle = makeStyles(modalClasses);

function Index({closeForm, openElementForm,setElements,element,setElement}) {
    const classes = useStyle({maxWidth: '700px'});
    const [isTourOpen, setIsTourOpen] = useState(false);

    const clicked = () => {
        setIsTourOpen(true);
    };

    return (<Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openElementForm.show}
            onClose={closeForm}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}>
            <Fade in={openElementForm.show} id="modal">
                <Box>
                    <StyledCancelButton onClick={closeForm}>
                        <StyledSvg>
                            <Exit width={'40px'} height={'40px'}/>
                        </StyledSvg>
                    </StyledCancelButton>
                    <ModalBody height={element.field_type !== '' ? 'fit-content' : ''}>
                        {element.field_type !== "" ?
                            <NewElementComponent
                                element={element}
                                setElement={setElement}
                                setElements={setElements}
                                closeForm={closeForm}
                                id={openElementForm.id}
                            /> : <ElementTypeListComponent setElement={setElement}/>
                        }
                    </ModalBody>
                    <StyledTourButton onClick={clicked} show={element.field_type !== '' ? 'true' : 'false'}>
                        <HelpIcon/>
                    </StyledTourButton>
                    <ElementTourComponent element={element} setIsTourOpen={setIsTourOpen} isTourOpen={isTourOpen}/>
                </Box>
            </Fade>
        </Modal>
    );
}

export default withNamespaces('translation')(Index);
