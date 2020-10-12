import React, {useContext, useEffect, useState} from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import { withNamespaces } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import uploadStyles from 'assets/js/partials/upload';
import clsx from "clsx";
import { globalCss } from '../../assets/js/globalCss';
import i18next from "i18next";
import rarImg from './../../assets/media/image/rarFileImg.png';
import textImg from './../../assets/media/image/textImg.png';
import AppContext from "../../contexts/AppContext";

const styles=makeStyles(uploadStyles);

const gClass = makeStyles(globalCss);

function UploadFileComponent({ t, multiple, title, getFile, files,setFiles, removedFileId, sendIdAfterUpload }) {
    const classes = styles();
    const appContext = useContext(AppContext);
    const gClasses = gClass();
    const lang = i18next.language;
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [validation, setValidation] = useState('');
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {debugger
        if (files && files[0] !== undefined && files.length > 0) {//for edit user
            let urls = [];
            let fids = [];
            for (let file of files) {
                urls.push(file.url);
                fids.push(file.fid);
            }
            setImagePreviewUrl([...urls]);
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
                setImagePreviewUrl(prevState => {
                    return [...prevState, rarImg]
                });
                setFiles(prevState => {
                    return [...prevState, currentFile];
                });
            } else if (['txt'].includes(extention)) {
                setImagePreviewUrl(prevState => {
                    return [...prevState, textImg]
                });
                setFiles(prevState => {
                    return [...prevState, currentFile];
                });
            } else {
                let reader = new FileReader();
                reader.onload = () => {
                    setFiles(prevState => {
                        return [...prevState, currentFile];
                    });
                    setImagePreviewUrl(prevState => {
                        return [...prevState, reader.result]
                    });
                }
                reader.readAsDataURL(currentFile);
            }
        }
    }, [sendIdAfterUpload]);

    let uploadFile = (e) => {
        appContext.setLoading(true);
        if (e.currentTarget.files[0] !== undefined) {
            let extention = (e.currentTarget.files[0].name).split('.').pop();
            setValidation('');
            setFiles((prevState => {
                return [...prevState]
            }));
            setImagePreviewUrl((prevState => {
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
                setImagePreviewUrl([]);
                arrayOfFiles.push(e.currentTarget.files[0]);
            }
            getFile([...arrayOfFiles]);
        }
    }

    let handleRemoveImg = (e, src) => {
        let index = imagePreviewUrl.indexOf(src);
        let newImgPreview = imagePreviewUrl.filter(item => item !== src);
        let deletedFile = files.splice(index, 1);
        let newFiles = files.filter(item => item !== deletedFile);
        setImagePreviewUrl(newImgPreview);
        setFiles(newFiles);
        removedFileId(e.currentTarget.id);
    }

    let $imagePreview = [];

    if (imagePreviewUrl.length > 0) {
        for (let i = 0; i < (imagePreviewUrl.length); i++) {
            $imagePreview.push(<div id="fileBlock">
                <span className="cancel" id={currentId[i]} onClick={e => handleRemoveImg(e, imagePreviewUrl[i], files[i])}>
                    <CancelIcon />
                </span>
                <img  src={rarImg} className="item" />
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
