import React, {useContext, useState} from "react";
import {withNamespaces} from "react-i18next";

import {Box} from "@material-ui/core";

import UploadImg from "components/partials/UploadImgComponent.jsx";
import UploadFileComponent from "components/partials/UploadFileComponent.jsx";
import UploadVideo from "components/partials/UploadVideo";
import UploadVoice from "components/partials/UploadVoice";
import AppContext from "contexts/AppContext";
import {
    removeMultiImgMethod, uploadMultiFileMethod, uploadMultiImgMethod,
    uploadVideoMethod, uploadVoiceMethod, removeMultiFileMethod,
    removeMultiVideoMethod, removeMultiVoiceMethod
} from "./FormContentFileComponent.js";
import ContentsContext from "contexts/ContentsContext";
import {StyledAlignTypography} from "assets/js/App";

function FormContentFileComponent({t}) {
    const appContext = useContext(AppContext);
    const contentsContext = useContext(ContentsContext);
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
        removeMultiImgMethod(currentId, contentsContext);
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
    // console.log(contentsContext.multiImgs);
    return (<>
        <Box className="card">
            <StyledAlignTypography>{t('contents:imgGallery')}</StyledAlignTypography>
            <UploadImg multiple={true}
                       title={t('translation:choosePic')}
                       getFile={uploadMultiImg}
                       imgs={contentsContext.multiImgs}
                       removedFileId={removeMultiImg}
                       sendIdAfterUpload={multiImgToSendFid}
                       imagePreviewUrl={contentsContext.multiImagePreviewUrl}
                       setImagePreviewUrl={contentsContext.setMultiImagePreviewUrl}/>
        </Box>
        <Box className="card">
            <StyledAlignTypography>{t('contents:fileGallery')}</StyledAlignTypography>
            <UploadFileComponent multiple={true}
                                 title={t('translation:chooseFile')}
                                 getFile={uploadMultiFile}
                                 files={contentsContext.files}
                                 setFiles={contentsContext.setFiles}
                                 removedFileId={removeMultiFile}
                                 sendIdAfterUpload={multiFileToSendId}
                                 setFilesPreviewUrl={contentsContext.setFilesPreviewUrl}
                                 filesPreviewUrl={contentsContext.filesPreviewUrl}/>
        </Box>
        <Box className="card">
            <StyledAlignTypography>{t('contents:videoGallery')}</StyledAlignTypography>
            <UploadVideo multiple={true}
                         videos={contentsContext.videos}
                         title={t('translation:chooseVideo')}
                         getFile={uploadVideo}
                         removedFileId={removeMultiVideo}
                         sendIdAfterUpload={multiVideoToSend}
                         videoPreviewUrl={contentsContext.videoPreviewUrl}
                         setvideoPreviewUrl={contentsContext.setvideoPreviewUrl}/>
        </Box>
        <Box className="card">
            <StyledAlignTypography>{t('contents:voiceGallery')}</StyledAlignTypography>
            <UploadVoice multiple={true}
                         title={t('translation:chooseVoice')}
                         getFile={uploadVoice}
                         voices={contentsContext.voices}
                         removedFileId={removeMultiVoice}
                         sendIdAfterUpload={multiVoiceToSend}
                        setVoicesPreviewUrl={contentsContext.setVoicesPreviewUrl}
                        voicesPreviewUrl={contentsContext.voicesPreviewUrl}/>
        </Box>
    </>);
}

export default withNamespaces('contents,translation')(FormContentFileComponent);
