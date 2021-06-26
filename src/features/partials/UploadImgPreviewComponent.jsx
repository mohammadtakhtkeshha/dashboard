import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import i18next from "i18next";

import CancelIcon from "@material-ui/icons/Cancel";

import {
    InputBlock,
    StyledAfterUploadBlock,
    StyledAfterUploadHere,
    StyledUploadedImgBlock,
    StyledUploadHereBlock,
    UploadedImgHoverBlock
} from "assets/js/partials/uploadImg";
import {StyledAlignTypography, StyledValidError} from "assets/js/App";
import {ReactComponent as UploadImgSvg} from "assets/svg/uploadImgSvg.svg";

function UploadImgPreviewComponent({t, title, multiple, getFileInParent, removeImgInParent, previewUrl, setPreviewUrl}) {
    const lang = i18next.language;
    const [validation, setValidation] = useState('');

    const uploadImg = (e) => {
        let files = e.currentTarget.files;
        setValidation('');
        for (let file of files) {
            let extension = (file.name).split('.').pop();
            if (!['jpg', 'png', 'jpeg'].includes(extension)) {
                setValidation(t('translation:imgValidation'));
                return
            }
         
            let reader = new FileReader();
            reader.onload = function (e) {
                setPreviewUrl(prevState => {
                    return [...prevState, e.target.result]
                })

            }
            reader.readAsDataURL(file); // convert to base64 string
        }
        getFileInParent(e.currentTarget.files);
    }

    const handleRemoveImg = async (e, index) => {
        await removeImgInParent(index);
        setPreviewUrl(prevState => {
            prevState.splice(index, 1)
            return [...prevState]
        })
    }

    return (<>
        <InputBlock>
            {previewUrl.length ?
                <>
                    <StyledAlignTypography align={lang}>
                        {t('translation:imgsList')}
                    </StyledAlignTypography>
                    <StyledAfterUploadBlock>
                        {previewUrl.map((url, index) => {
                            return (<div key={index}>
                                <StyledUploadedImgBlock>
                                    <img src={url} alt={url}/>
                                    <UploadedImgHoverBlock>
                                    <span id={index} onClick={(e) => handleRemoveImg(e, index)}>
                                        <CancelIcon/>
                                    </span>
                                    </UploadedImgHoverBlock>
                                </StyledUploadedImgBlock>
                            </div>)
                        })}
                        <div>
                            <StyledAfterUploadHere>
                                <input type='file' multiple={multiple} onChange={uploadImg}/>
                                <UploadImgSvg/>
                                <span> {t('translation:uploadNewImg')} </span>
                            </StyledAfterUploadHere>
                        </div>
                    </StyledAfterUploadBlock>
                </>
                :
                <StyledUploadHereBlock>
                    <input type='file' multiple={multiple} onChange={uploadImg}/>
                    <UploadImgSvg/>
                    <p>{title}</p>
                    <button>{t('translation:choose')}</button>
                </StyledUploadHereBlock>
            }
        </InputBlock>
        <StyledValidError lang={lang}>
            {validation}
        </StyledValidError>
    </>);
}

export default withNamespaces('users,translation')(UploadImgPreviewComponent);

