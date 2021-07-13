import {editComment} from 'core/services/comment.service';
import i18next from 'i18next';
import {stringToBoolean} from "../../../../../../../../methods/commons";

export const handleChangeCommentMethod = (e, setComment, field) => {
    let currentValue = e.currentTarget.value;
    if (currentValue === 'true' || currentValue === 'false') {
        currentValue = stringToBoolean(currentValue)
    }
    setComment(prevState => {
        return {...prevState, [field]: [{value: currentValue}]};
    });
};

export const handleChangeStatusMethod = (e, setComment) => {
    const status = e.currentTarget.value === 'true' ? true : false;
    setComment(prevState => {
        return {...prevState, status: [{value: status}]};
    });
};

const getTitle = (title) => {
    return decodeURI(title.split('/').pop())
}

export const editCommentMethod = (id, comment, setLoading, handlePagination, unconfirmedComments, publishedComments, commentStatus, setOpen) => {
    const getCurrentCommentInList =
        commentStatus === 'published' ? publishedComments.filter(item => item.cid === id) : unconfirmedComments.filter(item => item.cid === id);
    const currentStatus = comment.status[0].value;
    setLoading(true);
    editComment(id, comment, setLoading, handlePagination).then(response => {
        setLoading(false);
        const curComment = response.data;
        const changedComment = {
            subject: curComment.subject.length > 0 ? curComment.subject[0].value : '',
            created: curComment.changed[0].value,
            field_image: getCurrentCommentInList[0].field_image,
            link: `${process.env.REACT_APP_API_URL}/comment/${curComment.cid[0].value}`,
            status: curComment.status[0].value,
            cid: `${curComment.cid[0].value}`,
            name: getCurrentCommentInList[0].name,
            view_node: `${process.env.REACT_APP_PICTURE_URL}/${curComment.entity_id[0].url}`,
            title: getTitle(curComment.entity_id[0].url),
        };
        if ((commentStatus === 'published' && currentStatus === false) || (commentStatus === 'unconfirmed' && currentStatus === true)) {
            //if status has changed
            if (commentStatus === 'published') {
                const filteredComment = publishedComments.filter(item => item.cid === id);
                const currentIndex = publishedComments.indexOf(filteredComment[0]);
                publishedComments.splice(currentIndex, 1);
                unconfirmedComments.push(changedComment);
                handlePagination(publishedComments, i18next.t('translation:successEdited'), true, 'published');
                handlePagination(unconfirmedComments, false, true, 'unconfirmed');
            } else {
                const filteredComment = unconfirmedComments.filter(item => item.cid === id);
                const currentIndex = unconfirmedComments.indexOf(filteredComment[0]);
                unconfirmedComments.splice(currentIndex, 1);
                publishedComments.push(changedComment);
                handlePagination(unconfirmedComments, i18next.t('translation:successEdited'), true, 'unconfirmed');
                handlePagination(publishedComments, false, true, 'published');
            }
        } else {
            if (comment.status[0].value) {
                const filteredComment = publishedComments.filter(item => item.cid === id);
                const currentIndex = publishedComments.indexOf(filteredComment[0]);
                publishedComments[currentIndex] = changedComment;
                handlePagination(publishedComments, i18next.t('translation:successEdited'), true, 'published');
            } else {
                const filteredComment = unconfirmedComments.filter(item => item.cid === id);
                const currentIndex = unconfirmedComments.indexOf(filteredComment[0]);
                unconfirmedComments[currentIndex] = changedComment;
                handlePagination(unconfirmedComments, i18next.t('translation:successEdited'), true, 'unconfirmed');
            }
        }
    });
    setOpen({show: false, id: ''});
};
