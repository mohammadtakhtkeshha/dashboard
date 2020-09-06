import {Box, Typography} from "@material-ui/core";
import UploadImg from "../../../../../partials/UploadImg";
import UploadFile from "../../../../../partials/UploadFile";
import UploadVideo from "../../../../../partials/UploadVideo";
import UploadVoice from "../../../../../partials/UploadVoice";
import ButtonComponent from "../../../../../partials/ButtonComponent";
import {primary} from "../../../../../partials/Colors";
import React, {useContext, useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";
import {makeStyles} from "@material-ui/core/styles";
import {globalCss} from "../../../../../../assets/js/globalCss";
import contentService from "../../../../../../core/services/content.service";
import {danger} from "../../../../../../methods/swal";
import AppContext from "../../../../../../contexts/AppContext";

const gClass = makeStyles(globalCss);

function FileContentTabComponent({t, content, setContent}) {
    let lang = i18next.language;
    const appContext = useContext(AppContext);
    const gClasses = gClass();
    const [multiImgFids, setMultiImgFids] = useState([]);
    const [singleImgToSendFid, setSingleImgToSendFid] = useState('');
    const [multiImgToSendFid, setMultiImgToSendFid] = useState('');
    const [multiFileToSendId, setMultiFileToSendId] = useState('');
    const [multiVideoToSend, setMultiVideoToSend] = useState('');
    const [multiVoiceToSend, setMultiVoiceToSend] = useState('');

    let uploadSingImg = (e) => {
        if (e.length > 0) {
            contentService.uploadSingImg(e).then((response) => {
                let item = response.data;
                setSingleImgToSendFid({id: item.fid, file: e[0]});
                setContent(prevState => {
                    return {
                        ...prevState, field_image: {
                            target_id: response.data.fid,
                            target_type: 'file'
                        }
                    }
                });
            }).catch((error) => {
                handleError(error)
            });
        } else {
            setContent(prevState => {
                return {
                    ...prevState, field_image: ''
                }
            });
        }
    };
    let uploadMultiImg = (file) => {
        if (file.length > 0) {
            let fids = [];
            for (let e of file) {
                contentService.uploadMultiImg(e).then((response) => {
                    setMultiImgToSendFid({id: response.data.fid, file: e});
                    let fidsString = fids.toString();
                    setMultiImgFids(prevState => {
                        return [...prevState, {fid: response.data.fid, name: e.name}];
                    });
                    setContent(prevState => {
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
                    handleError(error);
                });
            }
        } else {
            setContent(prevState => {
                return {
                    ...prevState, multiImg: ''
                }
            });
        }
    };
    let handleError = (error) => {
        danger(t('translation:error'), t('translation:ok'));
        appContext.toggleLoading(false);
        console.log(error);
    }

    let uploadMultiFile = (files) => {
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
                    setContent(prevState => {
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
                    handleError(error);
                    // swal({
                    //     text: t('translation:notDone'),
                    //     button: {
                    //         text: t('translation:ok')
                    //         , className: gClasses.confirmSwalButton
                    //     },
                    //     className: gClasses.makeSwalButtonCenter,
                    //     icon: "success"
                    // });
                });
            }
        } else {
            setContent(prevState => {
                return {
                    ...prevState, multiImg: ''
                }
            });
        }

    }
    let uploadVideo = (files) => {
        for (let e of files) {
            contentService.uploadVideo(e).then((response) => {
                let item = response.data;
                setMultiVideoToSend({id: item.fid, file: e});
                setContent(prevState => {
                    let fids = [];
                    if (prevState.field_videos.target_id !== undefined) {
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
                handleError(error)
            });
        }

    };
    let register = () => {
        // let date = new Date();
        // let currentDate = date.toDateString();
        // let arrDate = currentDate.split(' ');
        // setContent((prevState) => {
        //     return {
        //         ...prevState, arrDate
        //     }
        // });
        contentService.registerContent(content).then((response) => {
            debugger
        }).catch((error) => {
            debugger
            handleError(error);
        });
    };
    let uploadVoice = (files) => {
        if (files.length > 0) {
            for (let e of files) {
                contentService.uploadVoice(e).then((response) => {
                    let item = response.data;
                    setMultiVoiceToSend({id: response.data.fid, file: e});
                    setContent(prevState => {
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
                    handleError(error);
                });
            }

        } else {
            setContent(prevState => {
                return {
                    ...prevState, field_sounds: ''
                }
            });
        }


    };
    let removeMultiImg = (currentId) => {
        let fidsString = content.field_field_galeries.target_id;
        let fidsArray = fidsString.split(',');
        let currentIndex = fidsArray.indexOf(currentId);
        fidsArray.splice(currentIndex, 1);
        let field_gallery;
        if (fidsArray.length > 0) {
            field_gallery = {target_id: fidsArray.toString(), type: 'file'}
        } else {
            field_gallery = '';
        }
        setContent(prevState => {
            return {
                ...prevState, field_field_galeries: field_gallery
            }
        });
    }

    let removeMultiFile = (currentId) => {
        let fidsString = content.field_files.target_id;
        let fidsArray = fidsString.split(',');
        let currentIndex = fidsArray.indexOf(currentId);
        fidsArray.splice(currentIndex, 1);
        let field_file;
        if (fidsArray.length > 0) {
            field_file = {target_id: fidsArray.toString(), type: 'file'}
        } else {
            field_file = '';
        }
        setContent(prevState => {
            return {
                ...prevState, field_files: field_file
            }
        });

    }

    let removeMultiVideo = (currentId) => {
        let fidsString = content.field_videos.target_id;
        let fidsArray = fidsString.split(',');
        let currentIndex = fidsArray.indexOf(currentId);
        fidsArray.splice(currentIndex, 1);
        let field_file;
        if (fidsArray.length > 0) {
            field_file = {target_id: fidsArray.toString(), type: 'file'}
        } else {
            field_file = '';
        }
        setContent(prevState => {
            return {
                ...prevState, field_videos: field_file
            }
        });
    }

    let removeMultiVoice = (currentId) => {
        let fidsString = content.field_sounds.target_id;
        let fidsArray = fidsString.split(',');
        let currentIndex = fidsArray.indexOf(currentId);
        fidsArray.splice(currentIndex, 1);
        let field_file;
        if (fidsArray.length > 0) {
            field_file = {target_id: fidsArray.toString(), type: 'file'}
        } else {
            field_file = '';
        }
        setContent(prevState => {
            return {
                ...prevState, field_sounds: field_file
            }
        });
    }

    let removedSingleImg = (id) => {
        setContent(prevState => {
            return {
                ...prevState, field_image: ''
            }
        });
    }
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
            <ButtonComponent background={primary} color="primary" clicked={register} text={t('translation:register')}/>
        </Box>
    </>);
}

export default withNamespaces('contents,translation')(FileContentTabComponent);
