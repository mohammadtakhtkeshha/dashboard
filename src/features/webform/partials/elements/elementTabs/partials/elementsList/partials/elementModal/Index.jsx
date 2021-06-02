import React, {useState} from 'react';
import {withNamespaces} from 'react-i18next';
import {useHistory} from "react-router-dom"

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

function Index({closeForm, openElementForm}) {
    const classes = useStyle({maxWidth: '700px'});
    const [isTourOpen, setIsTourOpen] = useState(false);
    const history = useHistory()
    const form_id = history.location.pathname.split('/').pop()
    const [element, setElement] = useState({
        "form_id": form_id,
        "field_options": "",
        "field_required": false,
        "field_title": "",
        "field_type": "",
        "field_id": "",
        "admin_title": ""
    })

    const clicked = () => {
        setIsTourOpen(true);
    };

    console.log(element)

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
                    <ModalBody>
                        {element.field_type !== "" ?
                            <NewElementComponent
                                element={element}
                                setElement={setElement}
                                closeForm={closeForm}
                                id={openElementForm.id}
                            /> : <ElementTypeListComponent setElement={setElement}/>
                        }
                    </ModalBody>
                    <StyledTourButton onClick={clicked}>
                        <HelpIcon/>
                    </StyledTourButton>
                    <ElementTourComponent setIsTourOpen={setIsTourOpen} isTourOpen={isTourOpen}/>
                </Box>
            </Fade>
        </Modal>
    );
}

export default withNamespaces('translation')(Index);
