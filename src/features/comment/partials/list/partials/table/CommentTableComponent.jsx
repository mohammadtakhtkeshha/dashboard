import React, {useState, useContext, useEffect} from "react";
import {withNamespaces} from "react-i18next";

import Pagination from "@material-ui/lab/Pagination";

import userImg from "assets/media/image/user.jpg";
import {StyledPaginationBox} from "assets/js/pagination";
import {StyledBackgroundColor, StyledConfirmButton} from 'assets/js/comment/commentTable'
import CommentModalComponent from "./partials/CommentModalComponent.jsx";
import StyledCheckboxComponent from "infrastructure/authorized/partials/StyledCheckboxComponent";
import AppContext from "contexts/AppContext";
import {
    StyledTableBody,
    StyledTableBodyRow,
    StyledActionButtons,
    StyledActionsBlock,
} from "assets/js/App";
import {
    StyledTr,
    StyledTableHeadTr,
    StyledTable,
    StyledTableImg,
    StyledCheckboxImgInTable,
    StyledTableCell
} from "assets/js/library/components/table"
import {getJustDate} from "./CommentTableComponent.js"
import {
    isHandlerMethod,
    allCheckboxHandlerMethod,
    deleteCommentMethod,
    changePageByCommentStatusMethod,
    makeActiveHandlerMethod,
    paginateMethod,
    getCommentMethod
} from "./CommentTableComponent.js";
import {warning} from "methods/swal";
import {multiAction} from "../../../CommentsActionComponent";
import deleteIcon from "assets/svg/delete.png";
import editIcon from "assets/svg/edit.png";
import {getDateOfFullDate} from "./CommentTableComponent";
import i18next from "i18next";
import {convertDashToSlashInDate, formatDayToEnd, toShamsiDate} from "methods/commons";

function CommentTableComponent({t, comments, publishPage, unconfirmPage, setUnconfirmPage, setPublishPage, selectedCheckBoxes, setSelectedCheckBoxes, commentStatus, handlePagination, publishedComments, unconfirmedComments, totalPublishPage, totalUnconfirmPage}) {
    const appContext = useContext(AppContext);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState({show: false, id: ''});
    const [comment, setComment] = useState({});
    const lang = i18next.language;

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

    const makeActiveHandler = (e) => {
        const id = e.currentTarget.value;
        warning(t('translation:sureQuestion'), t('translation:ok'), t('translation:cancel'), t('translation:notDone'),
            function () {
                makeActiveHandlerMethod(id, appContext, t, publishedComments, unconfirmedComments, comments, handlePagination)
            });
    }

    useEffect(() => {
        changePageByCommentStatus();
    }, [commentStatus]);

    return (<>
        <StyledTable>
            <StyledTableHeadTr>
                <StyledTableCell width="20" minWidth={100} align="center">
                    <StyledCheckboxImgInTable minWidth="98">
                        <StyledCheckboxComponent
                            checked={((selectedCheckBoxes.length) === ((comments[page] !== undefined) ? comments[page].length : 'zero'))}
                            change={(e) => allCheckboxHandler(e)}/>
                        <div>{t('translation:subject')}</div>
                    </StyledCheckboxImgInTable>
                </StyledTableCell>
                {/*<StyledTableCell width="20" align={lang === "en" ? "left" : "right"}>*/}
                {/*    {t('translation:subject')}*/}
                {/*</StyledTableCell>*/}
                <StyledTableCell width="48"
                                 align={lang === "en" ? "left" : "right"}>{t('comments:sentIn')}</StyledTableCell>
                <StyledTableCell width="10" minWidth={55} align="center">{t('translation:author')}</StyledTableCell>
                <StyledTableCell width="10" minWidth={55} align="center">{t('translation:date')}</StyledTableCell>
                <StyledTableCell width="12" minWidth={111} align="center">
                    {/*{t('translation:action')}*/}
                </StyledTableCell>
            </StyledTableHeadTr>
            <StyledTableBody>
                {comments.length > 0 ? (comments[page].map((comment, index) =>
                    (<React.Fragment key={index}>
                        <StyledTr>
                            {/*<StyledTableCell width="10" minWidth={100} align="center">*/}
                            {/*    <StyledCheckboxImgInTable minWidth="98">*/}
                            {/*<StyledCheckboxComponent*/}
                            {/*    change={(e) => isCheckedHandler(e, comment.cid)}*/}
                            {/*    checked={selectedCheckBoxes.includes(`${comment.cid}`)}/>*/}
                            {/*<StyledTableImg>*/}
                            {/*    {comment.field_image ? <img src={comment.field_image} alt="comment.name"/> :*/}
                            {/*        <img src={userImg}/>}*/}
                            {/*</StyledTableImg>*/}
                            {/*</StyledCheckboxImgInTable>*/}
                            {/*</StyledTableCell>*/}
                            <StyledTableCell width="20" align={lang === "en" ? "left" : "right"}>
                                <StyledCheckboxImgInTable minWidth="98">
                                    <StyledCheckboxComponent
                                        change={(e) => isCheckedHandler(e, comment.cid)}
                                        checked={selectedCheckBoxes.includes(`${comment.cid}`)}/>
                                    {comment.subject}
                                </StyledCheckboxImgInTable>
                            </StyledTableCell>
                            <StyledTableCell width="48" align={lang === "en" ? "left" : "right"}>
                                <a href={comment.view_node}>{comment.title}</a>
                            </StyledTableCell>
                            <StyledTableCell width="10" minWidth={55} align="center">{comment.name}</StyledTableCell>
                            <StyledTableCell width="10" minWidth={55} align="center">
                                {toShamsiDate(convertDashToSlashInDate(getJustDate(comment.created, true)))}</StyledTableCell>
                            <StyledTableCell width="12" minWidth={111} align="center">
                                {/*<StyledActionButtonBlock>*/}
                                {/*    <button value={comment.cid} onClick={showEditForm}>*/}
                                {/*        <Typography>*/}
                                {/*            {t('translation:edit')}*/}
                                {/*        </Typography>*/}
                                {/*    </button>*/}
                                {/*    <button value={comment.cid} onClick={deleteComment}>*/}
                                {/*        {t('translation:delete')}*/}
                                {/*    </button>*/}
                                {/*    <StyledConfirmButton commentStatus={commentStatus} value={comment.cid}*/}
                                {/*                         onClick={makeActiveHandler}>*/}
                                {/*        {t('translation:active')}*/}
                                {/*    </StyledConfirmButton>*/}
                                {/*</StyledActionButtonBlock>*/}

                                <StyledActionsBlock>
                                    <StyledActionButtons value={comment.cid} onClick={deleteComment}>
                                        <img src={deleteIcon} alt={comment.cid}/>
                                    </StyledActionButtons>
                                    <StyledActionButtons value={comment.cid} onClick={showEditForm}>
                                        <img src={editIcon} alt={comment.cid}/>
                                    </StyledActionButtons>
                                    <StyledConfirmButton commentStatus={commentStatus} value={comment.cid}
                                                         onClick={makeActiveHandler}>
                                        {t('translation:active')}
                                    </StyledConfirmButton>
                                </StyledActionsBlock>
                            </StyledTableCell>
                        </StyledTr>
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
