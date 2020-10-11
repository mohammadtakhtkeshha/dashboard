import contentService from "core/services/content.service";

export const uploadMultiImgMethod = (file,newContentContext,setMultiImgFids,appContext,setMultiImgToSendFid) => {
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

export const uploadMultiFileMethod = (files,newContentContext,setMultiFileToSendId,setMultiImgFids,appContext) => {
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

export const uploadVideoMethod = (files,contentsContext,setMultiVideoToSend,appContext) => {
    for (let e of files) {
        contentService.uploadVideo(e).then((response) => {
            let item = response.data;
            setMultiVideoToSend({id: item.fid, file: e});
            contentsContext.setContent(prevState => {
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
            appContext.handleError(error)
        });
    }

}

export const uploadVoiceMethod = (files,contentsContext,setMultiVoiceToSend,appContext) => {
    if (files.length > 0) {
        for (let e of files) {
            contentService.uploadVoice(e).then((response) => {
                let item = response.data;
                setMultiVoiceToSend({id: response.data.fid, file: e});
                contentsContext.setContent(prevState => {
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
        contentsContext.setContent(prevState => {
            return {
                ...prevState, field_sounds: ''
            }
        });
    }
}

export const removeMultiImgMethod = (currentId,contentsContext) => {
    let fidsString = contentsContext.content.field_field_galeries.target_id;
    let fidsArray = fidsString.split(',');
    let currentIndex = fidsArray.indexOf(currentId);
    fidsArray.splice(currentIndex, 1);
    let field_gallery;
    if (fidsArray.length > 0) {
        field_gallery = {target_id: fidsArray.toString(), type: 'file'}
    } else {
        field_gallery = {};
    }
    contentsContext.setContent(prevState => {
        return {
            ...prevState, field_field_galeries: field_gallery
        }
    });
}

export const removeMultiFileMethod = (currentId,contentsContext)=>{
    let fidsString = contentsContext.content.field_files.target_id;
    let fidsArray = fidsString.split(',');
    let currentIndex = fidsArray.indexOf(currentId);
    fidsArray.splice(currentIndex, 1);
    let field_file;
    if (fidsArray.length > 0) {
        field_file = {target_id: fidsArray.toString(), type: 'file'}
    } else {
        field_file = '';
    }
    contentsContext.setContent(prevState => {
        return {
            ...prevState, field_files: field_file
        }
    });
}

export const removeMultiVideoMethod = (currentId,contentsContext) => {
    let fidsString = contentsContext.content.field_videos.target_id;
    let fidsArray = fidsString.split(',');
    let currentIndex = fidsArray.indexOf(currentId);
    fidsArray.splice(currentIndex, 1);
    let field_file;
    if (fidsArray.length > 0) {
        field_file = {target_id: fidsArray.toString(), type: 'file'}
    } else {
        field_file = '';
    }
    contentsContext.setContent(prevState => {
        return {
            ...prevState, field_videos: field_file
        }
    });
}

export const removeMultiVoiceMethod = (currentId,contentsContext) => {
    let fidsString = contentsContext.content.field_sounds.target_id;
    let fidsArray = fidsString.split(',');
    let currentIndex = fidsArray.indexOf(currentId);
    fidsArray.splice(currentIndex, 1);
    let field_file;
    if (fidsArray.length > 0) {
        field_file = {target_id: fidsArray.toString(), type: 'file'}
    } else {
        field_file = '';
    }
    contentsContext.setContent(prevState => {
        return {
            ...prevState, field_sounds: field_file
        }
    });
}

export default {uploadMultiImgMethod,uploadMultiFileMethod,
    uploadVideoMethod,uploadVoiceMethod,removeMultiImgMethod,removeMultiFileMethod,
    removeMultiVideoMethod,removeMultiVoiceMethod}