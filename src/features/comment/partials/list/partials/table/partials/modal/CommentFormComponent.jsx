import React, {useContext} from 'react';
import {withNamespaces} from 'react-i18next';
import i18next from 'i18next';

import {Grid} from '@material-ui/core';

import {StyledAlignTypography, StyledInput} from 'assets/js/App';
import {StyledFooter, StyledTextArea} from 'assets/js/comment/commentForm';
import {StyledModalHeader, StyledModalBody} from 'assets/js/library/components/modal';
import {handleChangeCommentMethod, editCommentMethod} from './CommentFormComponent.js';
import AppContext from 'contexts/AppContext';
import EditorComponent from 'infrastructure/authorized/partials/EditorComponent.jsx';
import {toHtml} from 'methods/commons';

function CommentFormComponent({t, open, setOpen, publishedComments, unconfirmedComments, handlePagination, comment, setComment, commentStatus}) {
    const lang = i18next.language;
    const {setLoading} = useContext(AppContext);

    const handleChangeComment = (e, field) => {
        handleChangeCommentMethod(e, setComment, field);
    };

    const editComment = e => {
        editCommentMethod(e.currentTarget.value, comment, setLoading, handlePagination, unconfirmedComments, publishedComments, commentStatus, setOpen);
    };

    return (
        <>
            <StyledModalHeader>{t('comments:editComment')}</StyledModalHeader>
            <StyledModalBody>
                <Grid container>
                    <Grid item xs={12}>
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

                    {/*<StyledGrid item xs={12}>*/}
                    {/*<StyledStatusButtonBlock className="status">*/}
                    {/*    <StyledStatusButton value={true} status={comment.status ? comment.status[0].value : false}*/}
                    {/*                        onClick={handleChangeStatus}>*/}
                    {/*        {t('contents:published')}*/}
                    {/*    </StyledStatusButton>*/}
                    {/*    <StyledStatusButton value={false} status={comment.status ? comment.status[0].value : false}*/}
                    {/*                        onClick={handleChangeStatus}>*/}
                    {/*        {t('contents:unpublished')}*/}
                    {/*    </StyledStatusButton>*/}
                    {/*</StyledStatusButtonBlock>*/}
                    {/*</StyledGrid>*/}

                    <Grid item xs={12}>
                        <StyledTextArea className="textarea">
                            <EditorComponent
                                value={comment.comment_body && comment.comment_body.length > 0 ? toHtml(comment.comment_body[0].value) : ''}
                                title={t('translation:description')}
                                onClick={e => handleChangeComment(e, 'comment_body')}
                            />
                        </StyledTextArea>
                    </Grid>
                </Grid>
            </StyledModalBody>
            <StyledFooter lang={lang}>
                <button value={open.id} onClick={editComment}>
                    {t('translation:register')}
                </button>
                <button onClick={() => setOpen({show: false, id: ''})}>{t('translation:cancel')}</button>
            </StyledFooter>
        </>
    );
}

export default withNamespaces('translation,comments')(CommentFormComponent);
