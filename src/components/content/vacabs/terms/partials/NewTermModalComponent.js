import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Box} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {makeStyles} from "@material-ui/styles";

import {modalStyles} from "assets/js/App";
import NewTermComponent from "./NewTermComponent";

const styles = makeStyles(modalStyles);

function NewTermModalComponent({openTermForm,setOpenTermForm}) {
    const classes = styles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openTermForm}
            onClose={setOpenTermForm}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openTermForm} id="modal">
                <div className={classes.paper} dir="rtl">
                    <Box className="header">
                        <button onClick={setOpenTermForm}>
                            <CancelIcon/>
                        </button>
                    </Box>
                    <Box className="body">
                        <NewTermComponent/>
                    </Box>
                </div>
            </Fade>
        </Modal>)
}

export default NewTermModalComponent;
