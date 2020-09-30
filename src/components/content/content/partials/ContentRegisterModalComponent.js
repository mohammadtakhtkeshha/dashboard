import React, {useState} from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/styles";
import ContentListOfContentType from "./ContentListOfContentType";

import {useStyles} from "assets/js/content/contentRegisterModal";
import NewContent from "./../newContent/index"

const useStyle = makeStyles(useStyles);

export default function ContentRegisterModalComponent({openRegisterForm, handleCloseContentForm}) {
    const classes = useStyle();
    const [contentType, setContentType] = useState('');

    const handleCloseRegisterForm = () => {
        handleCloseContentForm();
        setContentType('');
    };

    return (
        <>
            <Modal
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
                {contentType === '' ?<ContentListOfContentType handleCloseRegisterForm={handleCloseRegisterForm} openRegisterForm={openRegisterForm} setContentType={setContentType}/>
                    :<NewContent contentType={contentType} openRegisterForm={openRegisterForm} handleCloseRegisterForm={handleCloseRegisterForm}/>
                }
            </Modal>

        </>);
}

