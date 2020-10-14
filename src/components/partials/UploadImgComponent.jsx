import React, {useContext, useEffect, useState} from "react";
import AppContext from "contexts/AppContext";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import CancelIcon from '@material-ui/icons/Cancel';

import {ReactComponent as UploadImgSvg} from "assets/svg/uploadImgSvg.svg";
import {StyledAlignTypography, StyledValidError} from "assets/js/App";
import {
    StyledTypography,
    InputBlock,
    StyledUploadHereBlock,
    StyledAfterUploadBlock,
    StyledAfterUploadHere,
    StyledUploadedImgBlock,
    UploadedImgHoverBlock
} from 'assets/js/partials/uploadImg'
import {previewImgMethod, removeImgMethod} from './UploadImgComponent.js'

function UploadImgComponent({t, multiple, title, getFile, imgs, removedFileId, sendIdAfterUpload, imagePreviewUrl, setImagePreviewUrl}) {
    const lang = i18next.language;
    const appContext = useContext(AppContext);
    const [files, setFiles] = useState([]);
    const [validation, setValidation] = useState('');
    const [currentId, setCurrentId] = useState('');
    const handlePreviewImg = (e) => {
        previewImgMethod(e, t, appContext, setValidation, setFiles, setImagePreviewUrl, multiple, getFile);
    }

    const handleRemoveImg = (e, src, file) => {
        removeImgMethod(e, src, imagePreviewUrl, files, setImagePreviewUrl, setFiles, removedFileId);
    }

    let $imagePreview = [];

    if (imagePreviewUrl.length > 0) {
        let uploadedImgs = [];
        for (let i = 0; i < (imagePreviewUrl.length); i++) {
            uploadedImgs.push(<div key={i}>
                <StyledUploadedImgBlock>
                    <img src={imagePreviewUrl[i]} className="item"/>
                    <UploadedImgHoverBlock>
                        <span id={currentId[i]} onClick={e => handleRemoveImg(e, imagePreviewUrl[i], files[i])}>
                             <CancelIcon/>
                        </span>
                    </UploadedImgHoverBlock>
                </StyledUploadedImgBlock>
            </div>);
        }
        $imagePreview.push(<StyledAfterUploadBlock>
            <StyledAlignTypography>{t('translation:imgsList')}</StyledAlignTypography>
            <StyledAfterUploadHere>
                <input type='file' multiple={multiple} onChange={e => handlePreviewImg(e)}/>
                <UploadImgSvg/>
                <span>{t('translation:uploadNewImg')}</span>
            </StyledAfterUploadHere>
            {uploadedImgs}
        </StyledAfterUploadBlock>);
    } else {
        $imagePreview.push(<StyledUploadHereBlock>
            <input type='file' multiple={multiple} onChange={e => handlePreviewImg(e)}/>
            <UploadImgSvg/>
            <p>{title}</p>
            <button>{t('translation:choose')}</button>
        </StyledUploadHereBlock>);
    }

    useEffect(() => {
        if (sendIdAfterUpload !== undefined && sendIdAfterUpload !== "") {
            appContext.setLoading(false);
            setCurrentId(prevState => {
                return [...prevState, sendIdAfterUpload.id];
            });
            let e = sendIdAfterUpload.file;
            let reader = new FileReader();
            reader.onload = () => {
                setFiles(prevState => {
                    return [...prevState, e];
                });
                if (!multiple) {
                    setFiles([]);
                    setImagePreviewUrl([reader.result]);
                } else {
                    setImagePreviewUrl(prevState => {
                        return [...prevState, reader.result]
                    });
                }
            }
            reader.readAsDataURL(e);
        }
    }, [sendIdAfterUpload]);//set id for every img

    useEffect(() => {
        if (imgs && imgs[0] !== undefined && imgs.length > 0) {//for edit user
            let urls = [];
            let fids = [];
            for (let img of imgs) {
                urls.push(img.url);
                fids.push(img.fid);
            }
            setImagePreviewUrl([...urls]);
            setCurrentId([...fids]);
        }
    }, [imgs]);

    return (<>
        <InputBlock>
            {$imagePreview.map((item, index) => (<div key={index}>{item}</div>))}
        </InputBlock>
        <StyledValidError lang={lang}>
            {validation}
        </StyledValidError>
    </>);
}

export default withNamespaces('users,translation')(UploadImgComponent);
