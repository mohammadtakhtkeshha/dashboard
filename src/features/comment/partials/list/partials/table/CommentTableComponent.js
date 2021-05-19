import { success, warning } from 'methods/swal';
import { deleteComment, getComment, multiActionRequest } from 'core/services/comment.service';
import i18next from 'i18next';

export const isHandlerMethod = (e, cid, selectedCheckBoxes, setSelectedCheckBoxes) => {
  const status = e.currentTarget.checked;
  let selectedCommentsArr = selectedCheckBoxes;
  if (status) {
    selectedCommentsArr.push(cid);
  } else {
    const filtered = selectedCommentsArr.filter(commentId => commentId !== cid);
    selectedCommentsArr = filtered;
  }
  setSelectedCheckBoxes([...selectedCommentsArr]);
};

export const allCheckboxHandlerMethod = (e, comments, page, setSelectedCheckBoxes) => {
  const status = e.currentTarget.checked;
  const currentCommentsIds = comments[page].map(({ cid }) => cid);
  if (status) {
    setSelectedCheckBoxes([...currentCommentsIds]);
  } else {
    setSelectedCheckBoxes([]);
  }
};

export const deleteCommentMethod = (cid, setLoading, commentStatus, handlePagination, publishedComments, unconfirmedComments) => {
  warning(
    i18next.t('translation:sureQuestion'),
    i18next.t('translation:yes'),
    i18next.t('translation:cancel'),
    i18next.t('translation:notDone'),
    function () {
      setLoading(true);
      deleteComment(cid, setLoading).then(response => {
        setLoading(false);
        const comments = commentStatus === 'published' ? publishedComments : unconfirmedComments;
        const newComments = comments.filter(comment => comment.cid !== cid);
        handlePagination(newComments, 'delete', true, commentStatus);
      });
    }
  );
};

export const getCommentMethod = (id, setComment, setLoading, setOpen) => {
  setLoading(true);
  getComment(id, setLoading).then(response => {
    setLoading(false);
    const currentContent = response.data;
    setComment({
      comment_type: [
        {
          target_id: 'comment',
          target_type: 'comment_type',
          target_uuid: currentContent.uuid[0].value,
        },
      ],
      status: [
        {
          value: currentContent.status[0].value,
        },
      ],
      subject: [
        {
          value: currentContent.subject[0] ? currentContent.subject[0].value : '',
        },
      ],
      comment_body: [
        {
          value: currentContent.comment_body && currentContent.comment_body.length > 0 ? currentContent.comment_body[0].processed : '',
        },
      ],
    });
    setOpen({ show: true, id: id });
  });
};

export const paginateMethod = (value, commentStatus, setPublishPage, setUnconfirmPage, setSelectedCheckBoxes, setPage) => {
  if (commentStatus === 'published') {
    setPublishPage(value - 1);
    setPage(value - 1);
  } else {
    setUnconfirmPage(value - 1);
    setPage(value - 1);
  }
  setSelectedCheckBoxes([]);
};

export const changePageByCommentStatusMethod = (commentStatus, setPage, publishPage, unconfirmPage) => {
  if (commentStatus === 'published') {
    setPage(publishPage);
  } else {
    setPage(unconfirmPage);
  }
};

export const makeActiveHandlerMethod = (id, setLoading, publishedComments, unconfirmedComments, comments, handlePagination) => {
  setLoading(true);
  const data = [{ id: id, status: true }];
  multiActionRequest(data, setLoading, 'active').then(response => {
    setLoading(false);
    for (let i = 0; i < comments.length; i++) {
      publishedComments.push(comments[i]);
      const currentIndex = unconfirmedComments.indexOf(comments[i]);
      unconfirmedComments.splice(currentIndex, 1);
      handlePagination(publishedComments, true, true, 'published');
      handlePagination(unconfirmedComments, true, true, 'unconfirmed');
    }
    success(i18next.t('translation:successDone'), i18next.t('translation:ok'));
  });
};

export const getDateOfFullDate = fullDate => {};

export const getJustDate = (date, reverse) => {
  const dateArray = date.split('T');
  return dateArray[0];
};
