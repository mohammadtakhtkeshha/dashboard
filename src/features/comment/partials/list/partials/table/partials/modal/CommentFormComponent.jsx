import React, {useContext} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';

import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

import {StyledAlignTypography, StyledInput} from 'assets/js/App';
import {StyledTextArea, StyledButtonStatus,styledGridStatus} from 'assets/js/comment/commentForm';
import {StyledModalHeader, StyledModalBody, StyledModalFooter} from 'assets/js/library/components/modal';
import {handleChangeCommentMethod, editCommentMethod} from './CommentFormComponent.js';
import AppContext from 'contexts/AppContext';
import {stripHtml, toHtml} from 'methods/commons';
import {handleChange} from "features/forms/partials/modal/partials/NewWebformComponent";

const StyledGridStatus = withStyles(styledGridStatus)(Grid)

function CommentFormComponent({t, open, setOpen, publishedComments, unconfirmedComments, handlePagination, comment, setComment, commentStatus}) {
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);


    const handleChangeComment = (e, field) => {
        handleChangeCommentMethod(e, setComment, field);
    };
    console.log(true)

    const editComment = e => {
        editCommentMethod(e.currentTarget.value, comment, setLoading, handlePagination, unconfirmedComments, publishedComments, commentStatus, setOpen);
    };

    return (
        <>
            <StyledModalHeader>{t('comments:editComment')}</StyledModalHeader>
            <StyledModalBody>
                <Grid container>
                    <Grid item xs={8}>
                        <StyledAlignTypography lang={lang}>{t('comments:commentBody')}</StyledAlignTypography>
                        <StyledInput
                            className="subject"
                            value={comment.subject ? comment.subject[0].value : ''}
                            placeholder={t('translation:subject')}
                            onChange={e => {
                                handleChangeComment(e, 'subject');
                            }}
                        />
                    </Grid>
                    <StyledGridStatus item xs={4} lang={lang}>
                        <StyledAlignTypography lang={lang}>{t('comments:commentBody')}</StyledAlignTypography>
                        <StyledButtonStatus status={comment.status[0].value} onClick={e=>handleChangeComment(e,'status')}>
                            {comment.status[0].value ? t('translation:inactivate') : t('translation:activate')}
                        </StyledButtonStatus>
                    </StyledGridStatus>
                    <Grid item xs={12}>
                        <StyledAlignTypography>{t('translation:description')}</StyledAlignTypography>
                        <StyledTextArea
                            className="textarea"
                            cols={10}
                            value={comment.comment_body && comment.comment_body.length > 0 ? toHtml(comment.comment_body[0].value) : ''}
                            onChange={e => handleChangeComment(e, 'comment_body')}/>
                    </Grid>
                </Grid>
            </StyledModalBody>
            <StyledModalFooter>
                <button value={open.id} onClick={editComment}>
                    {t('translation:register')}
                </button>
                <button onClick={() => setOpen({show: false, id: ''})}>{t('translation:cancel')}</button>
            </StyledModalFooter>
        </>
    );
}

export default withNamespaces('translation,comments')(CommentFormComponent);
