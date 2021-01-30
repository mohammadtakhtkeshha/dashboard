import {getPublishedComments, getUnconfirmedComments} from "core/services/comment.service";
import {chunkItem, handleTotalPage} from "structure/layout.js";
import {success} from "methods/swal";

export const getPublishedCommentsMethod = (handlePagination, setPublishedComments, appContext) => {
    appContext.setLoading(true);
    getPublishedComments(appContext.handleError).then((response) => {
        appContext.setLoading(false);
        const comments = response.data;
        setPublishedComments(comments)
        handlePagination(comments, false, true, 'published')
    });
}

export const getUnconfirmedCommentsMethod = (handlePagination, setUnconfirmedComments, appContext) => {
    appContext.setLoading(true);
    getUnconfirmedComments(appContext.handleError).then((response) => {
        appContext.setLoading(false);
        const comments = response.data;
        setUnconfirmedComments(comments);
        handlePagination(comments, false, true, 'unconfirmed');
    });
}

export function handlePaginationMethod(t, showSuccessMessage, comments, changeDefaultComments, commentStatus, begining, setUnconfirmedComments, setPublishedComments, setChunkPublishedComments, setChunkUnconfirmedComments, setTotalUnconfirmPage,setTotalPublishPage, setSelectedCheckBoxes) {
    const chunks = chunkItem(comments);
    const totalPage = handleTotalPage(comments);
    if (begining) {
        if (begining === 'published') {
            setChunkPublishedComments(chunks)
            setTotalPublishPage(totalPage);
        } else {
            setChunkUnconfirmedComments(chunks);
            setTotalUnconfirmPage(totalPage);
        }
        if (changeDefaultComments) {
            begining === 'published' ? setPublishedComments(comments) : setUnconfirmedComments(comments);
        }
    } else {
        if(commentStatus === 'published'){
            setChunkPublishedComments(chunks)
            setTotalPublishPage(totalPage);
        }else{
            setChunkUnconfirmedComments(chunks)
            setTotalUnconfirmPage(totalPage);

        }
        if (changeDefaultComments) {
            commentStatus === 'published' ? setPublishedComments(comments) : setUnconfirmedComments(comments);
        }
    }
    setSelectedCheckBoxes([]);
    showSuccessMessage && success(t(`translation:${showSuccessMessage}`), t('translation:ok'));
}
