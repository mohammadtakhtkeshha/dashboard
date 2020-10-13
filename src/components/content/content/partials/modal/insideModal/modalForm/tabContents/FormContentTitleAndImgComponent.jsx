import React, {useContext, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {Grid, Paper} from '@material-ui/core';

import {StyledInput} from "assets/js/App";
import {StyledTypographyError} from "assets/js/App";
import {uploadSingImgMethod, handleChangeMethod, removedSingleImgMethod} from './FormContentTitleAndImgComponent.js'
import UploadImg from "components/partials/UploadImgComponent.jsx";
import AppContext from "contexts/AppContext";
import ContentsContext from "contexts/ContentsContext";

function TextContentTabComponent({t}) {
    const lang = i18next.language;
    const appContext = useContext(AppContext);
    const contentContext = useContext(ContentsContext);
    const [singleImgToSendFid, setSingleImgToSendFid] = useState('');

    const handleChange = (e, field) => {
        contentContext.setErrors({});
        handleChangeMethod(e, field, contentContext,t);
    }

    const removedSingleImg = (id) => {
        removedSingleImgMethod(id, contentContext);
    }

    const uploadSingImg = (e) => {
        uploadSingImgMethod(e, contentContext, setSingleImgToSendFid, appContext);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Paper>
                    <StyledInput
                        value={contentContext.content.title}
                        type="text"
                        placeholder={t('translation:title')}
                        onChange={e => handleChange(e, "title")}
                    />
                    {contentContext.errors?.title ? <StyledTypographyError
                        align={lang === 'en' ? 'left' : 'right'}>{contentContext.errors.title}</StyledTypographyError> : ''}
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper>
                    <StyledInput
                        value={contentContext.content.field_rotitr || ''}
                        type="text"
                        placeholder={t('contents:rotitr')}
                        onChange={e => handleChange(e, "field_rotitr")}/>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper>
                    <StyledInput
                        placeholder={t('contents:sotitr')}
                        value={contentContext.content.field_sotitr || ''}
                        type="text"
                        label={t('contents:sotitr')}
                        onChange={e => handleChange(e, "field_sotitr")}/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <UploadImg multiple={false}
                           title={t('translation:choosePic')}
                           getFile={uploadSingImg}
                           removedFileId={removedSingleImg}
                           sendIdAfterUpload={singleImgToSendFid}
                           imgs={contentContext.singleImgs}
                           imagePreviewUrl={contentContext.imagePreviewUrl}
                           setImagePreviewUrl={contentContext.setImagePreviewUrl}

                />
            </Grid>
        </Grid>
    );
}

export default withNamespaces('contents,translation')(TextContentTabComponent);
