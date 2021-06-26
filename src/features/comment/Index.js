import { getPublishedComments, getUnconfirmedComments } from 'core/services/comment.service';
import { chunkItem, handleTotalPage } from 'infrastructure/layout.js';
import { success } from 'methods/swal';
import i18next from 'i18next';

export const getPublishedCommentsMethod = (handlePagination, setPublishedComments, setLoading) => {
  setLoading(true);
  getPublishedComments(setLoading).then(response => {
    setLoading(false);
    const comments = response.data.reverse();
    setPublishedComments(comments);
    handlePagination(comments, false, true, 'published');
  });
};

export const getUnconfirmedCommentsMethod = (handlePagination, setUnconfirmedComments, setLoading) => {
  setLoading(true);
  getUnconfirmedComments(setLoading).then(response => {
    setLoading(false);
    const comments = response.data;
    setUnconfirmedComments(comments);
    handlePagination(comments, false, true, 'unconfirmed');
  });
};

export function handlePaginationMethod(
  showSuccessMessage,
  comments,
  changeDefaultComments,
  commentStatus,
  begining,
  setUnconfirmedComments,
  setPublishedComments,
  setChunkPublishedComments,
  setChunkUnconfirmedComments,
  setTotalUnconfirmPage,
  setTotalPublishPage,
  setSelectedCheckBoxes
) {
  const chunks = chunkItem(comments);
  const totalPage = handleTotalPage(comments);
  if (begining) {
    if (begining === 'published') {
      setChunkPublishedComments(chunks);
      setTotalPublishPage(totalPage);
    } else {
      setChunkUnconfirmedComments(chunks);
      setTotalUnconfirmPage(totalPage);
    }
    if (changeDefaultComments) {
      begining === 'published' ? setPublishedComments(comments) : setUnconfirmedComments(comments);
    }
  } else {
    if (commentStatus === 'published') {
      setChunkPublishedComments(chunks);
      setTotalPublishPage(totalPage);
    } else {
      setChunkUnconfirmedComments(chunks);
      setTotalUnconfirmPage(totalPage);
    }
    if (changeDefaultComments) {
      commentStatus === 'published' ? setPublishedComments(comments) : setUnconfirmedComments(comments);
    }
  }
  setSelectedCheckBoxes([]);
  showSuccessMessage && success(i18next.t(`translation:${showSuccessMessage}`), i18next.t('translation:ok'));
}
