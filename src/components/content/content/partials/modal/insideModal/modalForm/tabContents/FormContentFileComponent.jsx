
import React, {useContext, useState} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";

import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import UploadImg from "components/partials/UploadImgComponent.jsx";
import UploadFile from "components/partials/UploadFile";
import UploadVideo from "components/partials/UploadVideo";
import UploadVoice from "components/partials/UploadVoice";
import {globalCss} from "assets/js/globalCss";
import AppContext from "contexts/AppContext";
import NewContentContext from "contexts/NewContentContext";

import {
    removeMultiImgMethod, uploadMultiFileMethod, uploadMultiImgMethod,
    uploadSingImgMethod, uploadVideoMethod, uploadVoiceMethod, removeMultiFileMethod,
    removeMultiVideoMethod, removeMultiVoiceMethod, removedSingleImgMethod
} from "./FormContentFileComponent";

const gClass = makeStyles(globalCss);

function FormContentFileComponent({t}) {
    let lang = i18next.language;
    const appContext = useContext(AppContext);
    const newContentContext = useContext(NewContentContext);
    const gClasses = gClass();
    const [multiImgFids, setMultiImgFids] = useState([]);
    const [singleImgToSendFid, setSingleImgToSendFid] = useState('');
    const [multiImgToSendFid, setMultiImgToSendFid] = useState('');
    const [multiFileToSendId, setMultiFileToSendId] = useState('');
    const [multiVideoToSend, setMultiVideoToSend] = useState('');
    const [multiVoiceToSend, setMultiVoiceToSend] = useState('');

    const uploadMultiImg = (file) => {
        uploadMultiImgMethod(file, newContentContext, setMultiImgFids, appContext, setMultiImgToSendFid);
    }

    const uploadMultiFile = (files) => {
        uploadMultiFileMethod(files, newContentContext, setMultiFileToSendId, setMultiImgFids, appContext);
    }

    const uploadVideo = (files) => {
        uploadVideoMethod(files, newContentContext, setMultiVideoToSend, appContext);
    }

    const uploadVoice = (files) => {
        uploadVoiceMethod(files, newContentContext, setMultiVoiceToSend, appContext)
    }

    const removeMultiImg = (currentId) => {
        removeMultiImgMethod(currentId);
    }

    const removeMultiFile = (currentId) => {
        removeMultiFileMethod(currentId, newContentContext);
    }

    const removeMultiVideo = (currentId) => {
        removeMultiVideoMethod(currentId, newContentContext);
    }

    const removeMultiVoice = (currentId) => {
        removeMultiVoiceMethod(currentId, newContentContext);
    }

    return (<>
        <Box className="card">
            <Typography
                className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:imgGallery')}</Typography>
            <UploadImg multiple={true} title={t('translation:choosePic')} getFile={uploadMultiImg}
                       removedFileId={removeMultiImg} sendIdAfterUpload={multiImgToSendFid}/>
        </Box>
        <Box className="card">
            <Typography
                className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:fileGallery')}</Typography>
            <UploadFile multiple={true} title={t('translation:chooseFile')} getFile={uploadMultiFile}
                        removedFileId={removeMultiFile} sendIdAfterUpload={multiFileToSendId}/>
        </Box>
        <Box className="card">
            <Typography
                className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:videoGallery')}</Typography>
            <UploadVideo multiple={true} title={t('translation:chooseVideo')} getFile={uploadVideo}
                         removedFileId={removeMultiVideo} sendIdAfterUpload={multiVideoToSend}/>
        </Box>
        <Box className="card">
            <Typography className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:voiceGallery')}</Typography>
            <UploadVoice multiple={true} title={t('translation:chooseVoice')} getFile={uploadVoice}
                         removedFileId={removeMultiVoice} sendIdAfterUpload={multiVoiceToSend}/>
        </Box>
    </>);
}

export default withNamespaces('contents,translation')(FormContentFileComponent);