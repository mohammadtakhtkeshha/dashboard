import React, {useState} from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/styles";
import {withStyles} from "@material-ui/core/styles";
import DialogContent from '@material-ui/core/DialogContent';

import ContentListOfContentType from "./partials/ContentListOfContentType";
import {useStyles} from "assets/js/content/partials/contentModal";
// import NewContent from "./../new/index";
import NewContent from "../new";

const useStyle = makeStyles(useStyles);

const dialogStyles = (theme) => ({
    root:{
        outline:0,
        display:'flex',
        justifyContent:'center',
        width:'fit-content',
    }
})

const DialogContentWithStyles = withStyles(dialogStyles)(DialogContent);

export default function ContentModalComponent({openRegisterForm, handleCloseContentForm}) {
    const classes = useStyle();
    const [contentType, setContentType] = useState('');

    const handleCloseRegisterForm = () => {
        handleCloseContentForm();
        setContentType('');
    };

    return (<Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openRegisterForm}
                onClose={handleCloseRegisterForm}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <DialogContentWithStyles>
                    {contentType === '' ? <ContentListOfContentType handleCloseRegisterForm={handleCloseRegisterForm}
                                                                    openRegisterForm={openRegisterForm}
                                                                    setContentType={setContentType}/>
                        : <NewContent contentType={contentType} openRegisterForm={openRegisterForm}
                                      handleCloseRegisterForm={handleCloseRegisterForm}/>
                    }
                </DialogContentWithStyles>
            </Modal>);
}

