import React, {useContext, useEffect, useState} from "react";
import { withNamespaces } from "react-i18next";
import clsx from "clsx";
import i18next from "i18next";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from "@material-ui/icons/Add";

import uploadStyles from 'assets/js/partials/upload';
import { globalCss } from 'assets/js/globalCss';
import rarImg from 'assets/media/image/rarFileImg.png';
import textImg from 'assets/media/image/textImg.png';
import AppContext from "contexts/AppContext";

const styles=makeStyles(uploadStyles);

const gClass = makeStyles(globalCss);

function UploadFileComponent({ t, multiple, title, getFile, files,setFiles, removedFileId, sendIdAfterUpload ,filesPreviewUrl,setFilesPreviewUrl}) {
    const classes = styles();
    const appContext = useContext(AppContext);
    const gClasses = gClass();
    const lang = i18next.language;
    const [validation, setValidation] = useState('');
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        if (files && files[0] !== undefined && files.length > 0) {//for edit user
            let urls = [];
            let fids = [];
            for (let file of files) {
                const length = file.url?.length;
                const extension=file.url?.substring(length-3,length);
                if(extension === 'zip'){
                    urls.push(rarImg);
                }else if(extension === 'txt'){
                    urls.push(textImg);
                }else{
                    urls.push(file.url);
                }
                fids.push(file.fid);
            }
            setFilesPreviewUrl([...urls]);
            setCurrentId([...fids]);
        }
    }, [files]);

    useEffect(() => {
        appContext.setLoading(false);
        if (sendIdAfterUpload !== undefined && sendIdAfterUpload !== "") {
            let currentFile=sendIdAfterUpload.file
            let fileName=currentFile.name;
            let extention = fileName.split('.').pop();
            setCurrentId(prevState => {
                return [...prevState, sendIdAfterUpload.id]
            });
            
            if (['rar', 'zip'].includes(extention)) {
                setFilesPreviewUrl(prevState => {
                    return [...prevState, rarImg]
                });
                setFiles(prevState => {
                    return [...prevState, currentFile];
                });
            } else if (['txt'].includes(extention)) {
                setFilesPreviewUrl(prevState => {
                    return [...prevState, textImg]
                });
                // setFiles(prevState => {
                //     return [...prevState, currentFile];
                // });
            } else {
                let reader = new FileReader();
                reader.onload = () => {
                    // setFiles(prevState => {
                    //     return [...prevState, currentFile];
                    // });
                    setFilesPreviewUrl(prevState => {
                        return [...prevState, reader.result]
                    });
                }
                reader.readAsDataURL(currentFile);
            }
        }
    }, [sendIdAfterUpload]);

    const uploadFile = (e) => {
        appContext.setLoading(true);
        if (e.currentTarget.files[0] !== undefined) {
            let extention = (e.currentTarget.files[0].name).split('.').pop();
            setValidation('');
            setFiles((prevState => {
                return [...prevState]
            }));
            setFilesPreviewUrl((prevState => {
                return [...prevState]
            }));
            if (!['jpg', 'txt', 'zip', 'rar'].includes(extention)) {
                setValidation(t('translation:fileValidation'));
                appContext.setLoading(false);
                return
            }
            let arrayOfFiles = [];

            if (multiple) {//check mutliple file or not
                arrayOfFiles = e.currentTarget.files;
            } else {
                setFiles([]);
                setFilesPreviewUrl([]);
                arrayOfFiles.push(e.currentTarget.files[0]);
            }
            getFile([...arrayOfFiles]);
        }
    }

    const handleRemoveImg = (e, src) => {
        let index = filesPreviewUrl.indexOf(src);
        let newImgPreview = filesPreviewUrl.filter(item => item !== src);
        let deletedFile = files.splice(index, 1);
        let newFiles = files.filter(item => item !== deletedFile);
        setFilesPreviewUrl(newImgPreview);
        setFiles(newFiles);
        removedFileId(e.currentTarget.id);
    }

    let $imagePreview = [];

    if (filesPreviewUrl.length > 0) {
        for (let i = 0; i < (filesPreviewUrl.length); i++) {
            $imagePreview.push(<div id="fileBlock">
                <span className="cancel" id={currentId[i]} onClick={e => handleRemoveImg(e, filesPreviewUrl[i], files[i])}>
                    <CancelIcon />
                </span>
                <img  src={filesPreviewUrl[i]} className="item" />
            </div>);
        }
    } else {
        $imagePreview.push(<div className="previewText">{title}</div>);
    }

    return (
        <Box>
            <Box className={classes.uploadFile}>
                <input type='file' className="input" multiple={multiple} onChange={e => uploadFile(e)} />
                <div className='file'>
                    <div className='blockPart'>
                        {$imagePreview.map((item, index) => (<span key={index}>{item}</span>))}
                        {$imagePreview[0].props.className === 'previewText' ? '' : <div className="addIcon">
                            <AddIcon />
                        </div>}
                    </div>
                </div>
            </Box>
            <Typography className={clsx(gClasses.validation, lang === 'en' ? gClasses.textLeft : gClasses.textRight)}>{validation}</Typography>
        </Box>
    );
}

export default withNamespaces('users,translation')(UploadFileComponent);
