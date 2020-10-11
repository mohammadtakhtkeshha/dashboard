import React, {useContext, useState} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";

import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import UploadImg from "components/partials/UploadImgComponent.jsx";
import UploadFileComponent from "components/partials/UploadFileComponent.jsx";
import UploadVideo from "components/partials/UploadVideo";
import UploadVoice from "components/partials/UploadVoice";
import {globalCss} from "assets/js/globalCss";
import AppContext from "contexts/AppContext";
import {
    removeMultiImgMethod, uploadMultiFileMethod, uploadMultiImgMethod,
    uploadVideoMethod, uploadVoiceMethod, removeMultiFileMethod,
    removeMultiVideoMethod, removeMultiVoiceMethod
} from "./FormContentFileComponent.js";
import ContentsContext from "contexts/ContentsContext";
import {StyledAlignTypography} from "../../../../../../../../assets/js/App";

const gClass = makeStyles(globalCss);

function FormContentFileComponent({t}) {
    let lang = i18next.language;
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);
    const gClasses = gClass();
    const [multiImgFids, setMultiImgFids] = useState([]);
    const [multiImgToSendFid, setMultiImgToSendFid] = useState('');
    const [multiFileToSendId, setMultiFileToSendId] = useState('');
    const [multiVideoToSend, setMultiVideoToSend] = useState('');
    const [multiVoiceToSend, setMultiVoiceToSend] = useState('');

    const uploadMultiImg = (file) => {
        uploadMultiImgMethod(file, contentsContext, setMultiImgFids, appContext, setMultiImgToSendFid);
    }

    const uploadMultiFile = (files) => {
        uploadMultiFileMethod(files, contentsContext, setMultiFileToSendId, setMultiImgFids, appContext);
    }

    const uploadVideo = (files) => {
        uploadVideoMethod(files, contentsContext, setMultiVideoToSend, appContext);
    }

    const uploadVoice = (files) => {
        uploadVoiceMethod(files, contentsContext, setMultiVoiceToSend, appContext)
    }

    const removeMultiImg = (currentId) => {
        removeMultiImgMethod(currentId,contentsContext);
    }

    const removeMultiFile = (currentId) => {
        removeMultiFileMethod(currentId, contentsContext);
    }

    const removeMultiVideo = (currentId) => {
        removeMultiVideoMethod(currentId, contentsContext);
    }

    const removeMultiVoice = (currentId) => {
        removeMultiVoiceMethod(currentId, contentsContext);
    }

    return (<>
        <Box className="card">
            <StyledAlignTypography>{t('contents:imgGallery')}</StyledAlignTypography>
            <UploadImg multiple={true} title={t('translation:choosePic')} getFile={uploadMultiImg}
                       removedFileId={removeMultiImg} sendIdAfterUpload={multiImgToSendFid}/>
        </Box>
        <Box className="card">
            <StyledAlignTypography>{t('contents:fileGallery')}</StyledAlignTypography>
            <UploadFileComponent multiple={true} title={t('translation:chooseFile')} getFile={uploadMultiFile}
                        removedFileId={removeMultiFile} sendIdAfterUpload={multiFileToSendId}/>
        </Box>
        <Box className="card">
            <StyledAlignTypography>{t('contents:videoGallery')}</StyledAlignTypography>
            <UploadVideo multiple={true} title={t('translation:chooseVideo')} getFile={uploadVideo}
                         removedFileId={removeMultiVideo} sendIdAfterUpload={multiVideoToSend}/>
        </Box>
        <Box className="card">
            <StyledAlignTypography>{t('contents:voiceGallery')}</StyledAlignTypography>
            <UploadVoice multiple={true} title={t('translation:chooseVoice')} getFile={uploadVoice}
                         removedFileId={removeMultiVoice} sendIdAfterUpload={multiVoiceToSend}/>
        </Box>
    </>);
}

export default withNamespaces('contents,translation')(FormContentFileComponent);