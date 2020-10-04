import React, {useContext, useEffect, useState} from "react";
import AppContext from "contexts/AppContext";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import {makeStyles} from "@material-ui/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from "@material-ui/icons/Add";

import uploadStyles from "assets/js/partials/upload";
import {globalCss} from 'assets/js/globalCss';
import {ReactComponent as UploadImgSvg} from "assets/svg/uploadImgSvg.svg";
import {StyledValidError} from "assets/js/App";
import {InputBlock, StyledTypography} from 'assets/js/partials/uploadImg'

const styles = makeStyles(uploadStyles);
const gClass = makeStyles(globalCss);

function UploadImgComponent({t, multiple, title, getFile, imgs, removedFileId, sendIdAfterUpload}) {
    const classes = styles();
    const gClasses = gClass();
    const lang = i18next.language;
    const appContext = useContext(AppContext);
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);//base64
    const [files, setFiles] = useState([]);
    const [validation, setValidation] = useState('');
    const [currentId, setCurrentId] = useState('');

    const uploadFile = (e) => {
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
            if (!['jpg', 'png', 'jpeg'].includes(extention)) {
                appContext.setLoading(false);
                setValidation(t('translation:imgValidation'));
                return
            }
            let arrayOfFiles = [];
            if (multiple) {//check mutliple img or not
                arrayOfFiles = e.currentTarget.files;
            } else {
                setFiles([]);
                setImagePreviewUrl([]);
                arrayOfFiles.push(e.currentTarget.files[0]);
            }
            getFile([...arrayOfFiles]);
        }
    }

    const handleRemoveImg = (e, src, file) => {
        let index = imagePreviewUrl.indexOf(src);
        let newImgPreview = imagePreviewUrl.filter(item => item !== src);
        let deletedFile = files.splice(index, 1);
        let newFiles = files.filter(item => item !== deletedFile);
        setImagePreviewUrl(newImgPreview);
        setFiles(newFiles);
        removedFileId(e.currentTarget.id);
    }

    useEffect(() => {
        if (sendIdAfterUpload !== undefined && sendIdAfterUpload !== "") {
            appContext.setLoading(false);
            setCurrentId(prevState => {
                return [...prevState, sendIdAfterUpload.id]
            });
            let e = sendIdAfterUpload.file;
            let reader = new FileReader();
            reader.onload = () => {
                setFiles(prevState => {
                    return [...prevState, e];
                });
                setImagePreviewUrl(prevState => {
                    return [...prevState, reader.result]
                });
            }
            reader.readAsDataURL(e);
        }
    }, [sendIdAfterUpload]);

    useEffect(() => {
        if (imgs && imgs[0] !== undefined && imgs.length > 0) {//for edit user
            let urls = [];
            for (let img of imgs) {
                urls.push(img);
            }
            setImagePreviewUrl([...urls]);
        }

    }, [imgs]);

    let $imagePreview = [];

    if (imagePreviewUrl.length > 0) {
        for (let i = 0; i < (imagePreviewUrl.length); i++) {
            $imagePreview.push(<div id="fileBlock">
                <span className="cancel" id={currentId[i]} onClick={e => handleRemoveImg(e, imagePreviewUrl[i], files[i])}>
                    <CancelIcon/>
                </span>
                <img src={imagePreviewUrl[i]} className="item"/>
            </div>);
        }
    } else {
        $imagePreview.push(<div className="previewText">{title}</div>);
    }

    return (<>
            <InputBlock>
                <input type='file' className="input" multiple={multiple} onChange={e => uploadFile(e)}/>
                <UploadImgSvg/>
                <div className='file'>
                    <div className='blockPart'>
                        {$imagePreview.map((item, index) => (<span key={index}>{item}</span>))}
                        {$imagePreview[0].props.className === 'previewText' ? '' :
                            <div className="addIcon">
                                <AddIcon/>
                            </div>}
                    </div>
                </div>
            </InputBlock>
            <StyledValidError lang={lang}>
                {validation}
            </StyledValidError>
        </>
    );
}

export default withNamespaces('users,translation')(UploadImgComponent);