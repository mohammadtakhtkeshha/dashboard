import React, {useContext, useState} from "react";
import i18next from "i18next";
import {withNamespaces} from "react-i18next";

import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import UploadImg from "components/partials/UploadImg";
import UploadFile from "components/partials/UploadFile";
import UploadVideo from "components/partials/UploadVideo";
import UploadVoice from "components/partials/UploadVoice";
import {primary} from "components/partials/Colors";
import {globalCss} from "assets/js/globalCss";
import contentService from "core/services/content.service";
import AppContext from "contexts/AppContext";
import NewContentContext from "contexts/NewContentContext";
import {StyledButton} from "assets/js/App";

const gClass = makeStyles(globalCss);

function FileContentTabComponent({t}) {
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

    const uploadSingImg = (e) => {
        if (e.length > 0) {
            contentService.uploadSingImg(e).then((response) => {
                let item = response.data;
                setSingleImgToSendFid({id: item.fid, file: e[0]});
                newContentContext.setContent(prevState => {
                    return {
                        ...prevState, field_image: {
                            target_id: `${response.data.fid}`,
                            target_type: 'file'
                        }
                    }
                });
            }).catch((error) => {
                appContext.handleError(error)
            });
        } else {
            newContentContext.setContent(prevState => {
                return {
                    ...prevState, field_image: ''
                }
            });
        }
    }

    const uploadMultiImg = (file) => {
        if (file.length > 0) {
            let fids = [];
            for (let e of file) {
                contentService.uploadMultiImg(e).then((response) => {
                    setMultiImgToSendFid({id: response.data.fid, file: e});
                    let fidsString = fids.toString();
                    setMultiImgFids(prevState => {
                        return [...prevState, {fid: response.data.fid, name: e.name}];
                    });
                    newContentContext.setContent(prevState => {
                        let fids = [];
                        if (prevState.field_field_galeries.target_id !== undefined) {

                            fids.push(prevState.field_field_galeries.target_id, response.data.fid);
                        } else {
                            fids.push(response.data.fid);
                        }
                        let lastFids = fids.toString();
                        return {
                            ...prevState, field_field_galeries: {
                                "target_id": lastFids,
                                "target_type": "file"
                            }
                        }
                    });
                }).catch((error) => {
                    appContext.handleError(error);
                });
            }
        } else {
            newContentContext.setContent(prevState => {
                return {
                    ...prevState, multiImg: ''
                }
            });
        }
    }

    const uploadMultiFile = (files) => {
        if (files.length > 0) {
            let fids = [];
            for (let e of files) {
                contentService.uploadMultiFile(e).then((response) => {
                    let item = response.data;
                    let fidsString = fids.toString();
                    setMultiFileToSendId({id: response.data.fid, file: e});
                    setMultiImgFids(prevState => {
                        return [...prevState, {fid: item.fid, name: e.name}];
                    });
                    newContentContext.setContent(prevState => {
                        let fids = [];
                        if (prevState.field_files.target_id !== undefined) {
                            fids.push(prevState.field_files.target_id, item.fid);
                        } else {
                            fids.push(item.fid);
                        }
                        let lastFids = fids.toString();
                        return {
                            ...prevState, field_files: {
                                "target_id": lastFids,
                                "target_type": "file"
                            }
                        }
                    });
                }).catch((error) => {
                    appContext.handleError(error);
                });
            }
        } else {
            newContentContext.setContent(prevState => {
                return {
                    ...prevState, multiImg: ''
                }
            });
        }

    }

    const uploadVideo = (files) => {
        for (let e of files) {
            contentService.uploadVideo(e).then((response) => {

                let item = response.data;
                setMultiVideoToSend({id: item.fid, file: e});
                newContentContext.setContent(prevState => {
                    let fids = [];
                    if (prevState.field_videos !== undefined) {
                        fids.push(prevState.field_videos.target_id, item.fid);
                    } else {
                        fids.push(item.fid);
                    }
                    let stringFids = fids.toString();
                    return {
                        ...prevState, field_videos: {
                            target_id: stringFids,
                            target_type: "file"
                        }
                    }
                });
            }).catch((error) => {
                appContext.handleError(error)
            });
        }
    }

    const register = () => {
        if (newContentContext.content.title === "") {
            newContentContext.setErrors({title: t('translation:requiredValid')});
        }
        contentService.registerContent(newContentContext.content).then((response) => {
            alert('registered');
        }).catch((error) => {
            let objError = {};
            const errorString = error.response.data.FailureReason.message.replace(/\n/g, 'a');
            const errorArray = errorString.split('.');
            for (let i in errorArray) {
                let newErrorMessage = errorArray[i].split(':');
                objError[newErrorMessage[0]] = newErrorMessage[1];
            }
            let titleError;
            debugger
            const arrayError = [];
            if (objError.atitle === " This value should not be null") {
                titleError = t('contents:nullTitle')
            }
            arrayError.push(titleError)
            appContext.handleError(arrayError);
        });

    };

    const uploadVoice = (files) => {
        if (files.length > 0) {
            for (let e of files) {
                contentService.uploadVoice(e).then((response) => {
                    let item = response.data;
                    setMultiVoiceToSend({id: response.data.fid, file: e});
                    newContentContext.setContent(prevState => {
                        let fids = [];
                        if (prevState.field_sounds.target_id !== undefined) {
                            fids.push(prevState.field_sounds.target_id, response.data.fid);
                        } else {
                            fids.push(response.data.fid);
                        }
                        let StringFid = fids.toString();

                        return {
                            ...prevState, field_sounds: {
                                "target_id": StringFid,
                                "target_type": "file"
                            }
                        }
                    });
                }).catch((error) => {
                    appContext.handleError(error);
                });
            }

        } else {
            newContentContext.setContent(prevState => {
                return {
                    ...prevState, field_sounds: ''
                }
            });
        }
    }

    const removeMultiImg = (currentId) => {
        let fidsString = newContentContext.content.field_field_galeries.target_id;
        let fidsArray = fidsString.split(',');
        let currentIndex = fidsArray.indexOf(currentId);
        fidsArray.splice(currentIndex, 1);
        let field_gallery;
        if (fidsArray.length > 0) {
            field_gallery = {target_id: fidsArray.toString(), type: 'file'}
        } else {
            field_gallery = '';
        }
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_field_galeries: field_gallery
            }
        });
    }

    const removeMultiFile = (currentId) => {
        let fidsString = newContentContext.content.field_files.target_id;
        let fidsArray = fidsString.split(',');
        let currentIndex = fidsArray.indexOf(currentId);
        fidsArray.splice(currentIndex, 1);
        let field_file;
        if (fidsArray.length > 0) {
            field_file = {target_id: fidsArray.toString(), type: 'file'}
        } else {
            field_file = '';
        }
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_files: field_file
            }
        });

    }

    const removeMultiVideo = (currentId) => {
        let fidsString = newContentContext.content.field_videos.target_id;
        let fidsArray = fidsString.split(',');
        let currentIndex = fidsArray.indexOf(currentId);
        fidsArray.splice(currentIndex, 1);
        let field_file;
        if (fidsArray.length > 0) {
            field_file = {target_id: fidsArray.toString(), type: 'file'}
        } else {
            field_file = '';
        }
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_videos: field_file
            }
        });
    }

    const removeMultiVoice = (currentId) => {
        let fidsString = newContentContext.content.field_sounds.target_id;
        let fidsArray = fidsString.split(',');
        let currentIndex = fidsArray.indexOf(currentId);
        fidsArray.splice(currentIndex, 1);
        let field_file;
        if (fidsArray.length > 0) {
            field_file = {target_id: fidsArray.toString(), type: 'file'}
        } else {
            field_file = '';
        }
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_sounds: field_file
            }
        });
    }

    const removedSingleImg = (id) => {
        newContentContext.setContent(prevState => {
            return {
                ...prevState, field_image: ''
            }
        });
    };

    return (<>
        <Box className="card">
            <Typography
                className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:indexImg')}</Typography>
            <UploadImg multiple={false} title={t('translation:choosePic')} getFile={uploadSingImg}
                       removedFileId={removedSingleImg} sendIdAfterUpload={singleImgToSendFid}/>
        </Box>
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
            {/*<UploadImg multiple={true} title={t('translation:chooseVideo')} getFile={uploadVideo}/>*/}
            <UploadVideo multiple={true} title={t('translation:chooseVideo')} getFile={uploadVideo}
                         removedFileId={removeMultiVideo} sendIdAfterUpload={multiVideoToSend}/>
        </Box>
        <Box className="card">
            <Typography
                className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>{t('contents:voiceGallery')}</Typography>
            <UploadVoice multiple={true} title={t('translation:chooseVoice')} getFile={uploadVoice}
                         removedFileId={removeMultiVoice} sendIdAfterUpload={multiVoiceToSend}/>
        </Box>
        <Box mt={2} className={lang === 'en' ? gClasses.textLeft : gClasses.textRight}>
            <StyledButton bg={primary} onClick={register}>
                {t('translation:register')}
            </StyledButton>
        </Box>
    </>);
}

export default withNamespaces('contents,translation')(FileContentTabComponent);
