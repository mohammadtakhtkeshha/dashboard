import React from 'react';
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import Modal from '@material-ui/core/Modal';

import CommentFormComponent from "./modal/CommentFormComponent.jsx";
import {StyledModal} from "assets/js/comment/commentModal";

function CommentModalComponent({t, open, setOpen, publishedComments, unconfirmedComments, handlePagination,comment,setComment,commentStatus}) {
    const lang = i18next.language;

    const handleClose = () => {
        setOpen({show:false,id:''});
    };

    return (<Modal open={open.show}
                   onClose={handleClose}
                   aria-labelledby="simple-modal-title"
                   aria-describedby="simple-modal-description">
        <StyledModal lang={lang}>
            <CommentFormComponent handlePagination={handlePagination}
                                  open={open}
                                  comment={comment}
                                  setComment={setComment}
                                  setOpen={setOpen}
                                  unconfirmedComments={unconfirmedComments}
                                  commentStatus={commentStatus}
                                  publishedComments={publishedComments}/>
        </StyledModal>
    </Modal>);
}

export default withNamespaces('translation')(CommentModalComponent);
