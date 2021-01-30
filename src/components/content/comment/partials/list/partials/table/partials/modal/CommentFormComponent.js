import {editComment} from "core/services/comment.service";

export const handleChangeCommentMethod = (e, setComment, field) => {
    let currentValue;
    if(field === "comment_body"){
         currentValue = e;
    }else{
         currentValue = e.currentTarget.value;
    }
    setComment(prevState => {
        return {...prevState, [field]: [{value: currentValue}]}
    });
}

export const handleChangeStatusMethod = (e, setComment) => {
    const status = e.currentTarget.value === "true" ? true : false;
    setComment(prevState => {
        return {...prevState, status: [{value: status}]}
    });
}

export const editCommentMethod = (id,t, comment, appContext, handlePagination, open, unconfirmedComments, publishedComments,commentStatus,setOpen) => {
    const getCurrentCommentInList = commentStatus === 'published' ? publishedComments.filter(item => item.cid === id) : unconfirmedComments.filter(item => item.cid === id);
    const currentStatus=comment.status[0].value;
    editComment(id, comment, appContext.handleError, handlePagination).then((response) => {
        const curComment = response.data;
        const changedComment = {
            "subject": curComment.subject[0].value,
            "last_updated": curComment.created[0].value,
            "field_image": getCurrentCommentInList[0].field_image,
            "link": `http://sitesazyas.rbp/web/comment/${curComment.cid[0].value}`,
            "status": curComment.status[0].value,
            "cid": `${curComment.cid[0].value}`,
            "name":getCurrentCommentInList[0].name,
            "view_node":`http://sitesazyas.rbp/${curComment.entity_id[0].url}`,
        }
        if ((commentStatus === 'published' && currentStatus === false) || (commentStatus === 'unconfirmed' && currentStatus === true)) {//if status has changed
            if (commentStatus === 'published') {
                const filteredComment = publishedComments.filter(item => item.cid === id);
                const currentIndex=publishedComments.indexOf(filteredComment[0]);
                publishedComments.splice(currentIndex,1);
                unconfirmedComments.push(changedComment);
                handlePagination(publishedComments,t('translation:successEdited'),true,'published')
                handlePagination(unconfirmedComments,false,true,'unconfirmed')
            } else {
                const filteredComment = unconfirmedComments.filter(item => item.cid === id);
                const currentIndex=unconfirmedComments.indexOf(filteredComment[0]);
                unconfirmedComments.splice(currentIndex,1);
                publishedComments.push(changedComment);
                handlePagination(unconfirmedComments,t('translation:successEdited'),true,'unconfirmed')
                handlePagination(publishedComments,false,true,'published')
            }
        }else{
            if (comment.status[0].value) {
                const filteredComment = publishedComments.filter(item => item.cid === id);
                const currentIndex=publishedComments.indexOf(filteredComment[0]);
                publishedComments[currentIndex]=changedComment;
                handlePagination(publishedComments,t('translation:successEdited'),true,'published')
            } else {
                const filteredComment = unconfirmedComments.filter(item => item.cid === id);
                const currentIndex=unconfirmedComments.indexOf(filteredComment[0]);
                unconfirmedComments[currentIndex]=changedComment;
                handlePagination(unconfirmedComments,t('translation:successEdited'),true,'unconfirmed')
            }

        }
    });
    setOpen({show:false,id:''});
}


