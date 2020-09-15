import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Box} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {makeStyles} from "@material-ui/styles";

import {currentStyles} from "assets/js/vocabs/vocabRegisterModal";


const styles = makeStyles(currentStyles);

function NewTermModalComponent({open, setOpen}) {
    const classes = styles();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open} id="modal">
                <div className={classes.paper} dir="rtl">
                    <Box className="header">
                        <button onClick={handleClose}>
                            <CancelIcon/>
                        </button>
                    </Box>
                    <Box className="body">
                        {/*<NewVocabsComponent/>*/}
                    </Box>
                </div>
            </Fade>
        </Modal>)
}

export default NewTermModalComponent;
