import React, {useState, useContext, useEffect} from "react";
import {withNamespaces} from "react-i18next";

import Pagination from "@material-ui/lab/Pagination";
import {CardMedia, Typography} from "@material-ui/core";

import userImg from "assets/media/image/user.jpg";
import {StyledPaginationBox} from "assets/js/pagination";
import {StyledBackgroundColor,StyledConfirmButton} from 'assets/js/comment/commentTable'
import CommentModalComponent from "./partials/CommentModalComponent";
import StyledCheckboxComponent from "components/partials/StyledCheckboxComponent";
import AppContext from "contexts/AppContext";
import {
    StyledCheckboxImgInTable,
    StyledTable,
    StyledTableHeadRow,
    StyledTableCell,
    StyledTableBody,
    StyledTableBodyRow,
    StyledActionButtonBlock
} from "assets/js/App";
import {
    isHandlerMethod,
    allCheckboxHandlerMethod,
    deleteCommentMethod,
    changePageByCommentStatusMethod,
    paginateMethod,
    getCommentMethod
} from "./CommentTableComponent.js";

function CommentTableComponent({t, comments, publishPage, unconfirmPage, setUnconfirmPage, setPublishPage, selectedCheckBoxes, setSelectedCheckBoxes, commentStatus, handlePagination, publishedComments, unconfirmedComments, totalPublishPage, totalUnconfirmPage}) {
    const appContext = useContext(AppContext);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState({show: false, id: ''});
    const [comment, setComment] = useState({});

    console.log(commentStatus)
    const allCheckboxHandler = (e) => {
        allCheckboxHandlerMethod(e, comments, page, setSelectedCheckBoxes);
    };

    const isCheckedHandler = (e, cid) => {
        isHandlerMethod(e, cid, selectedCheckBoxes, setSelectedCheckBoxes);
    };

    const deleteComment = (e) => {
        const id = e.currentTarget.value;
        deleteCommentMethod(t, id, appContext, commentStatus, handlePagination, publishedComments, unconfirmedComments);
    }

    const showEditForm = (e) => {
        getCommentMethod(e.currentTarget.value, setComment, appContext, setOpen);
    }

    const paginate = (e, value) => {
        paginateMethod(value, commentStatus, setPublishPage, setUnconfirmPage, setSelectedCheckBoxes, setPage);
    }

    const changePageByCommentStatus = () => {
        changePageByCommentStatusMethod(commentStatus, setPage, publishPage, unconfirmPage);
    }

    useEffect(() => {
        changePageByCommentStatus();
    }, [commentStatus]);

    return (<>
        <StyledTable>
            <StyledTableHeadRow>
                <StyledTableCell align="right">
                    <StyledCheckboxImgInTable>
                        <StyledCheckboxComponent
                            checked={((selectedCheckBoxes.length) === ((comments[page] !== undefined) ? comments[page].length : 'zero'))}
                            change={(e) => allCheckboxHandler(e)}/>
                        <div>{t('translation:image')}</div>
                    </StyledCheckboxImgInTable>
                </StyledTableCell>
                <StyledTableCell align="right">{t('translation:author')}</StyledTableCell>
                <StyledTableCell align="right">{t('translation:subject')}</StyledTableCell>
                <StyledTableCell align="right">{t('comments:sentIn')}</StyledTableCell>
                <StyledTableCell align="right">{t('translation:date')}</StyledTableCell>
                <StyledTableCell align="right">{t('translation:action')}</StyledTableCell>
            </StyledTableHeadRow>
            <StyledTableBody>
                {comments.length > 0 ? (comments[page].map((comment, index) =>
                    (<React.Fragment key={index}>
                        <StyledTableBodyRow>
                            <StyledTableCell align="right">
                                <StyledCheckboxImgInTable>
                                    <StyledCheckboxComponent
                                        change={(e) => isCheckedHandler(e, comment.cid)}
                                        checked={selectedCheckBoxes.includes(`${comment.cid}`)}/>
                                    <CardMedia id="img">
                                        {comment.field_image ? <img src={comment.field_image} alt="comment.name"/> :
                                            <img src={userImg}/>}
                                    </CardMedia>
                                </StyledCheckboxImgInTable>
                            </StyledTableCell>
                            <StyledTableCell align="right">{comment.name}</StyledTableCell>
                            <StyledTableCell align="right">{comment.subject}</StyledTableCell>
                            <StyledTableCell align="right">
                                <a href={comment.view_node}>{comment.view_node?.split('/').pop()}</a>
                            </StyledTableCell>
                            <StyledTableCell align="right">{comment.last_updated}</StyledTableCell>
                            <StyledTableCell align="right">
                                <StyledActionButtonBlock>
                                    <button value={comment.cid} onClick={showEditForm}>
                                        <Typography>
                                            {t('translation:edit')}
                                        </Typography>
                                    </button>
                                    <button value={comment.cid} onClick={deleteComment}>
                                        {t('translation:delete')}
                                    </button>
                                    <StyledConfirmButton commentStatus={commentStatus} value={comment.cid} onClick={deleteComment}>
                                        {t('translation:active')}
                                    </StyledConfirmButton>
                                </StyledActionButtonBlock>
                            </StyledTableCell>
                        </StyledTableBodyRow>
                    </React.Fragment>)
                )) : (<StyledTableBodyRow>
                    <StyledTableCell colSpan="6" align="right">{t('translation:notFoundRecord')}
                    </StyledTableCell>
                </StyledTableBodyRow>)}
            </StyledTableBody>
        </StyledTable>
        <StyledBackgroundColor>
            <StyledPaginationBox>
                {commentStatus === 'published' ? <Pagination count={(totalPublishPage)} onChange={paginate}/> :
                    <Pagination count={(totalUnconfirmPage)} onChange={paginate}/>}
            </StyledPaginationBox>
        </StyledBackgroundColor>
        <CommentModalComponent commentStatus={commentStatus} comment={comment} setComment={setComment}
                               handlePagination={handlePagination} open={open} setOpen={setOpen}
                               publishedComments={publishedComments} unconfirmedComments={unconfirmedComments}/>

    </>);
}

export default withNamespaces('translation,comments')(CommentTableComponent);
