import React, {useContext, useState, useEffect} from "react";
import {withNamespaces} from "react-i18next";
import {Box, Grid, withStyles} from "@material-ui/core";
import {MarginTop1, StyledAlignTypography, StyledInput} from "assets/js/App";
import {StyledHeader, StyledFooter, StyledForm, styledGrid, StyledTextArea} from "assets/js/comment/commentForm";
import i18next from "i18next";
import TextField from "@material-ui/core/TextField";
import {
    StyledStatusButton,
    StyledStatusButtonBlock
} from "assets/js/App";
import {
    handleChangeCommentMethod,
    handleChangeStatusMethod,
    editCommentMethod
} from './CommentFormComponent.js'
import AppContext from "contexts/AppContext";
import EditorComponent from "components/partials/EditorComponent.jsx";

const StyledGrid = withStyles(styledGrid)(Grid);

function CommentFormComponent({t, open, setOpen, publishedComments, unconfirmedComments, handlePagination, comment, setComment, commentStatus}) {
    const lang = i18next.language;
    const appContext = useContext(AppContext);

    const handleChangeComment = (e, field) => {
        debugger
        handleChangeCommentMethod(e, setComment, field);
    }

    const handleChangeStatus = (e) => {
        handleChangeStatusMethod(e, setComment)
    }

    const editComment = (e) => {
        editCommentMethod(e.currentTarget.value, t, comment, appContext, handlePagination, open, unconfirmedComments, publishedComments, commentStatus, setOpen);
    }

    // const CustomHTMLElement = (props) => {
    //     return <div dangerouslySetInnerHTML={{__html: props.customHtml}}/>
    // }

    console.log((comment.comment_body && comment.comment_body.length > 0) ? comment.comment_body[0].value : '')

    return (<>
        <StyledHeader>{t('comments:editComment')}</StyledHeader>
        <StyledForm>
            <Grid container>
                <Grid item xs={8}>
                    <StyledInput value={comment.subject ? comment.subject[0].value : ''}
                                 placeholder={t('translation:subject')} onChange={(e) => {
                        handleChangeComment(e, 'subject')
                    }}/>
                </Grid>
                <StyledGrid item xs={4}>
                    <StyledStatusButtonBlock>
                        <StyledStatusButton value={true} status={comment.status ? comment.status[0].value : false}
                                            onClick={handleChangeStatus}>
                            {t('contents:published')}
                        </StyledStatusButton>
                        <StyledStatusButton value={false} status={comment.status ? comment.status[0].value : false}
                                            onClick={handleChangeStatus}>
                            {t('contents:unpublished')}
                        </StyledStatusButton>
                    </StyledStatusButtonBlock>
                </StyledGrid>
                <Grid item xs={12}>
                    <StyledAlignTypography lang={lang}>{t('comments:commentBody')}</StyledAlignTypography>
                    <StyledTextArea>
                        <EditorComponent
                            value={(comment.comment_body && comment.comment_body.length > 0) ? comment.comment_body[0].value : ''}
                            title={t('translation:description')}
                            onClick={(e) => handleChangeComment(e, 'comment_body')}/>
                    </StyledTextArea>

                </Grid>

            </Grid>
        </StyledForm>
        <StyledFooter lang={lang}>
            <button value={open.id} onClick={editComment}>{t('translation:register')}</button>
            <button onClick={() => setOpen({show: false, id: ''})}>{t('translation:cancel')}</button>
        </StyledFooter>
    </>);

}

export default withNamespaces('translation,comments')(CommentFormComponent);
